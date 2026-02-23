'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const EDITABLE_KEYS = [
  'REAL_LOGIN',
  'ALLOW_REAL_SUBMIT',
  'CAPTURE_LOCAL_SCREENSHOT',
  'FAIRBANKS_PRIMARY_PLAYER',
  'FAIRBANKS_LOGIN_URL',
  'FAIRBANKS_USERNAME',
  'FAIRBANKS_PASSWORD',
  'FAIRBANKS_TRANSPORT_CODE',
  'FAIRBANKS_GOLFERS',
  'FAIRBANKS_TIME_WINDOW',
  'FAIRBANKS_COURSE_CODE',
  'FAIRBANKS_DISPLAY_OPT',
  'BOOKING_TIMEZONE',
  'NOTIFICATION_EMAIL',
  'NOTIFICATION_FROM_EMAIL',
];

const BOOLEAN_KEYS = new Set([
  'REAL_LOGIN',
  'ALLOW_REAL_SUBMIT',
  'CAPTURE_LOCAL_SCREENSHOT',
]);

const PASSWORD_KEYS = new Set(['FAIRBANKS_PASSWORD']);
const COURSE_CODE_OPTIONS = ['-ALL-', 'Lakes', 'Valley', 'Ocean'];

function prettyLabel(key) {
  return key
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeCourseCodeValue(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return '-ALL-';
  const lower = raw.toLowerCase();
  const match = COURSE_CODE_OPTIONS.find((o) => o.toLowerCase() === lower);
  return match ?? '-ALL-';
}

function normalizeConfigForForm(config = {}) {
  const next = {};
  for (const key of EDITABLE_KEYS) {
    next[key] = config[key] ?? '';
  }

  if (next.FAIRBANKS_PASSWORD === '••••••••') {
    next.FAIRBANKS_PASSWORD = '';
  }

  if (next.FAIRBANKS_COURSE_CODE) {
    next.FAIRBANKS_COURSE_CODE = normalizeCourseCodeValue(next.FAIRBANKS_COURSE_CODE);
  }

  return next;
}

function notifyDashboardMetaUpdated() {
  window.dispatchEvent(new CustomEvent('dashboard:bot-meta-updated'));
}

export default function GetMyTeeTimeWidget() {
  const [loading, setLoading] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [runningTest, setRunningTest] = useState(false);
  const [error, setError] = useState(null);

  const [configMeta, setConfigMeta] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [formConfig, setFormConfig] = useState(() => normalizeConfigForForm({}));

  const [formScheduleExpression, setFormScheduleExpression] = useState('');
  const [formTimezone, setFormTimezone] = useState('America/Los_Angeles');
  const [formTargetInput, setFormTargetInput] = useState('{"profileId":"fairbanks-morning"}');

  const [testPayloadText, setTestPayloadText] = useState('{"profileId":"fairbanks-morning"}');
  const [testResult, setTestResult] = useState(null);

  const isEnabled = schedule?.state === 'ENABLED';

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const errors = [];
    const [configRes, scheduleRes] = await Promise.all([
      fetch('/api/getmyteetime/config').catch((err) => ({ error: err.message })),
      fetch('/api/getmyteetime/schedule').catch((err) => ({ error: err.message })),
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
          setFormTargetInput(payload.targetInput || '{"profileId":"fairbanks-morning"}');
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

  const saveConfig = async () => {
    setSavingConfig(true);
    setError(null);
    try {
      const res = await fetch('/api/getmyteetime/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: formConfig }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to save config');
      }

      await fetchData();
      notifyDashboardMetaUpdated();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingConfig(false);
    }
  };

  const saveSchedule = async () => {
    setSavingSchedule(true);
    setError(null);
    try {
      const res = await fetch('/api/getmyteetime/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduleExpression: formScheduleExpression,
          timezone: formTimezone,
          targetInput: formTargetInput,
        }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || 'Failed to save schedule');
      }

      await fetchData();
      notifyDashboardMetaUpdated();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingSchedule(false);
    }
  };

  const toggleSchedule = async () => {
    setSavingSchedule(true);
    setError(null);
    try {
      const nextState = isEnabled ? 'DISABLED' : 'ENABLED';
      const res = await fetch('/api/getmyteetime/schedule', {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingSchedule(false);
    }
  };

  const runTest = async () => {
    setRunningTest(true);
    setError(null);
    setTestResult(null);

    try {
      let parsedPayload = {};
      if (testPayloadText.trim().length > 0) {
        parsedPayload = JSON.parse(testPayloadText);
      }

      const res = await fetch('/api/getmyteetime/test-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: parsedPayload }),
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
      formTimezone !== (schedule?.timezone || 'America/Los_Angeles') ||
      formTargetInput !== (schedule?.targetInput || '{"profileId":"fairbanks-morning"}')
    );
  }, [formScheduleExpression, formTimezone, formTargetInput, schedule]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>GetMyTeeTime Bot</CardTitle>
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
            <CardTitle>GetMyTeeTime Bot</CardTitle>
            <CardDescription>Manage Lambda env, scheduler, and safe preview invokes.</CardDescription>
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
                placeholder="cron(58 16 ? * MON,WED *)"
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
          <Field label="Target Input (JSON string)">
            <Input
              value={formTargetInput}
              onChange={(e) => setFormTargetInput(e.target.value)}
              placeholder='{"profileId":"fairbanks-morning"}'
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            <Button onClick={saveSchedule} disabled={savingSchedule || !scheduleDirty}>
              {savingSchedule ? 'Saving...' : 'Save Schedule'}
            </Button>
            <Button variant="outline" onClick={toggleSchedule} disabled={savingSchedule}>
              {isEnabled ? 'Disable Schedule' : 'Enable Schedule'}
            </Button>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Runtime Configuration</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {EDITABLE_KEYS.map((key) => {
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

              if (key === 'FAIRBANKS_COURSE_CODE') {
                return (
                  <Field key={key} label={prettyLabel(key)}>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={normalizeCourseCodeValue(value)}
                      onChange={(e) => onChangeConfig(key, e.target.value)}
                    >
                      {COURSE_CODE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                );
              }

              return (
                <Field key={key} label={prettyLabel(key)}>
                  <Input
                    type={PASSWORD_KEYS.has(key) ? 'password' : 'text'}
                    value={value}
                    onChange={(e) => onChangeConfig(key, e.target.value)}
                    placeholder={PASSWORD_KEYS.has(key) ? 'Leave blank to keep current' : ''}
                  />
                </Field>
              );
            })}
          </div>
          <Button onClick={saveConfig} disabled={savingConfig}>
            {savingConfig ? 'Saving...' : 'Save Configuration'}
          </Button>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Test Invoke (Preview)</h3>
          <Field label="Payload Override (JSON)">
            <textarea
              className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              value={testPayloadText}
              onChange={(e) => setTestPayloadText(e.target.value)}
            />
          </Field>
          <Button variant="outline" onClick={runTest} disabled={runningTest}>
            {runningTest ? 'Running...' : 'Run Test'}
          </Button>
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
