'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const BOOKING_KEYS = [
  'day-offset',
  'golfers',
  'confirm-booking',
  'midnight-poll',
  'earliest-time',
  'latest-time',
];

const PLAYERS = [
  {
    label: 'Player 2',
    keys: ['player-2-first-name', 'player-2-last-name', 'player-2-email'],
  },
  {
    label: 'Player 3',
    keys: ['player-3-first-name', 'player-3-last-name', 'player-3-email'],
  },
  {
    label: 'Player 4',
    keys: ['player-4-first-name', 'player-4-last-name', 'player-4-email'],
  },
];

const PARAM_KEYS = [
  ...BOOKING_KEYS,
  ...PLAYERS.flatMap((p) => p.keys),
];

const BOOLEAN_KEYS = new Set(['confirm-booking', 'midnight-poll']);

const PARAM_TO_ENV = {
  'day-offset': 'ER_DAY_OFFSET',
  'golfers': 'ER_GOLFERS',
  'confirm-booking': 'ER_CONFIRM_BOOKING',
  'midnight-poll': 'ER_MIDNIGHT_POLL',
  'earliest-time': 'ER_EARLIEST_TIME',
  'latest-time': 'ER_LATEST_TIME',
  'player-2-first-name': 'ER_PLAYER_2_FIRST_NAME',
  'player-2-last-name': 'ER_PLAYER_2_LAST_NAME',
  'player-2-email': 'ER_PLAYER_2_EMAIL',
  'player-3-first-name': 'ER_PLAYER_3_FIRST_NAME',
  'player-3-last-name': 'ER_PLAYER_3_LAST_NAME',
  'player-3-email': 'ER_PLAYER_3_EMAIL',
  'player-4-first-name': 'ER_PLAYER_4_FIRST_NAME',
  'player-4-last-name': 'ER_PLAYER_4_LAST_NAME',
  'player-4-email': 'ER_PLAYER_4_EMAIL',
};

function prettyLabel(key) {
  return key
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeConfigForForm(config = {}) {
  const next = {};
  for (const key of PARAM_KEYS) {
    next[key] = config[key] ?? '';
  }
  return next;
}

function notifyDashboardMetaUpdated() {
  window.dispatchEvent(new CustomEvent('dashboard:bot-meta-updated'));
}

export default function ERTeeTimeWidget() {
  const [loading, setLoading] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [runningTest, setRunningTest] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [configMeta, setConfigMeta] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [formConfig, setFormConfig] = useState(() => normalizeConfigForForm({}));

  const [formScheduleExpression, setFormScheduleExpression] = useState('');
  const [formTimezone, setFormTimezone] = useState('America/Los_Angeles');

  const [testResult, setTestResult] = useState(null);

  const isEnabled = schedule?.state === 'ENABLED';

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const errors = [];
    const [configRes, scheduleRes] = await Promise.all([
      fetch('/api/erteetime/config').catch((err) => ({ error: err.message })),
      fetch('/api/erteetime/schedule').catch((err) => ({ error: err.message })),
    ]);

    if (configRes.error) {
      errors.push(`Config: ${configRes.error}`);
    } else {
      try {
        const payload = await configRes.json();
        if (!configRes.ok) {
          errors.push(`Config: ${payload.error || 'Failed to fetch config'}`);
        } else {
          setConfigMeta(payload);
          setFormConfig(normalizeConfigForForm(payload.config || {}));
        }
      } catch (err) {
        errors.push(`Config: ${err.message}`);
      }
    }

    if (scheduleRes.error) {
      errors.push(`Schedule: ${scheduleRes.error}`);
    } else {
      try {
        const payload = await scheduleRes.json();
        if (!scheduleRes.ok) {
          errors.push(`Schedule: ${payload.error || 'Failed to fetch schedule'}`);
        } else {
          setSchedule(payload);
          setFormScheduleExpression(payload.scheduleExpression || '');
          setFormTimezone(payload.timezone || 'America/Los_Angeles');

        }
      } catch (err) {
        errors.push(`Schedule: ${err.message}`);
      }
    }

    if (errors.length > 0) {
      setError(errors.join('; '));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const onChangeConfig = (key, value) => {
    setFormConfig((prev) => ({ ...prev, [key]: value }));
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const saveConfig = async () => {
    setSavingConfig(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/erteetime/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: formConfig }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to save config');
      }

      setConfigMeta((prev) => ({ ...prev, lastModified: new Date().toISOString() }));
      setFormConfig(normalizeConfigForForm(payload.config || formConfig));
      notifyDashboardMetaUpdated();
      showSuccess('Configuration saved');
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingConfig(false);
    }
  };

  const saveSchedule = async () => {
    setSavingSchedule(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/erteetime/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduleExpression: formScheduleExpression,
          timezone: formTimezone,
        }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to save schedule');
      }

      await fetchData();
      notifyDashboardMetaUpdated();
      showSuccess('Schedule saved');
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingSchedule(false);
    }
  };

  const toggleSchedule = async () => {
    setSavingSchedule(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const nextState = isEnabled ? 'DISABLED' : 'ENABLED';
      const res = await fetch('/api/erteetime/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: nextState }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to toggle schedule');
      }

      await fetchData();
      notifyDashboardMetaUpdated();
      showSuccess(nextState === 'ENABLED' ? 'Schedule enabled' : 'Schedule disabled');
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingSchedule(false);
    }
  };

  const [confirmingRun, setConfirmingRun] = useState(false);

  const runTest = async () => {
    if (!confirmingRun) {
      setConfirmingRun(true);
      return;
    }
    setConfirmingRun(false);
    setRunningTest(true);
    setError(null);
    setTestResult(null);

    try {
      // Build env overrides from current form config
      const envOverrides = {};
      for (const [paramKey, envKey] of Object.entries(PARAM_TO_ENV)) {
        const val = formConfig[paramKey];
        if (val !== '' && val !== null && val !== undefined) {
          envOverrides[envKey] = val;
        }
      }

      const res = await fetch('/api/erteetime/test-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ envOverrides }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to run test');
      }

      setTestResult(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setRunningTest(false);
    }
  };

  const scheduleDirty = useMemo(() => {
    return (
      formScheduleExpression !== (schedule?.scheduleExpression || '') ||
      formTimezone !== (schedule?.timezone || 'America/Los_Angeles')
    );
  }, [formScheduleExpression, formTimezone, schedule]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ER TeeTime Bot</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>ER TeeTime Bot</CardTitle>
            <CardDescription>Manage Parameter Store config, scheduler, and manual runs (ECS Fargate).</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Scheduler</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Schedule Expression">
              <Input
                value={formScheduleExpression}
                onChange={(e) => setFormScheduleExpression(e.target.value)}
                placeholder="cron(57 6 ? * THU,FRI *)"
              />
            </Field>
            <Field label="Timezone">
              <Input
                value={formTimezone}
                onChange={(e) => setFormTimezone(e.target.value)}
                placeholder="America/Los_Angeles"
              />
            </Field>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={saveSchedule} disabled={savingSchedule || !scheduleDirty}>
              {savingSchedule ? 'Saving...' : 'Save Schedule'}
            </Button>
            <Button variant="outline" onClick={toggleSchedule} disabled={savingSchedule}>
              {isEnabled ? 'Disable Schedule' : 'Enable Schedule'}
            </Button>
            {successMessage && successMessage.includes('chedule') && (
              <span className="text-sm text-green-600">{successMessage}</span>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Booking Settings (Parameter Store)</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {BOOKING_KEYS.map((key) => {
              const value = formConfig[key] ?? '';

              if (BOOLEAN_KEYS.has(key)) {
                return (
                  <Field key={key} label={prettyLabel(key)}>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={value === '' ? 'false' : value}
                      onChange={(e) => onChangeConfig(key, e.target.value)}
                    >
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  </Field>
                );
              }

              return (
                <Field key={key} label={prettyLabel(key)}>
                  <Input
                    value={value}
                    onChange={(e) => onChangeConfig(key, e.target.value)}
                  />
                </Field>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Players</h3>
          <div className="space-y-4">
            {PLAYERS.map((player) => (
              <div key={player.label} className="rounded-md border border-border p-3 space-y-2">
                <span className="text-xs font-medium text-muted-foreground">{player.label}</span>
                <div className="grid gap-3 md:grid-cols-3">
                  {player.keys.map((key) => {
                    const shortLabel = key.split('-').slice(2).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
                    return (
                      <Field key={key} label={shortLabel}>
                        <Input
                          value={formConfig[key] ?? ''}
                          onChange={(e) => onChangeConfig(key, e.target.value)}
                        />
                      </Field>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center gap-2">
          <Button onClick={saveConfig} disabled={savingConfig}>
            {savingConfig ? 'Saving...' : 'Save Configuration'}
          </Button>
          {successMessage && successMessage.includes('onfiguration') && (
            <span className="text-sm text-green-600">{successMessage}</span>
          )}
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Manual Run (ECS Fargate)</h3>
          <p className="text-xs text-muted-foreground">
            Launches an ECS task with current form values as env overrides.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={confirmingRun ? 'destructive' : 'outline'}
              onClick={runTest}
              disabled={runningTest}
            >
              {runningTest ? 'Starting task...' : confirmingRun ? 'Are you sure?' : 'Run Task'}
            </Button>
            {confirmingRun && (
              <Button variant="outline" onClick={() => setConfirmingRun(false)}>
                Cancel
              </Button>
            )}
          </div>
          {testResult && (
            <pre className="overflow-auto rounded-md border border-border bg-muted/30 p-3 text-xs">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          )}
        </section>

        {configMeta?.lastModified && (
          <p className="text-xs text-muted-foreground">
            Last modified: {new Date(configMeta.lastModified).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
