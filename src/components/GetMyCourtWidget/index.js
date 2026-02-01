'use client';

import { useState, useEffect, useCallback } from 'react';

export default function GetMyCourtWidget() {
  const [config, setConfig] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formConfig, setFormConfig] = useState({});
  const [formSchedule, setFormSchedule] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [configRes, scheduleRes] = await Promise.all([
        fetch('/api/getmycourt/config'),
        fetch('/api/getmycourt/schedule'),
      ]);

      if (!configRes.ok || !scheduleRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const configData = await configRes.json();
      const scheduleData = await scheduleRes.json();

      setConfig(configData);
      setSchedule(scheduleData);
      setFormConfig(configData.config || {});
      setFormSchedule(scheduleData.scheduleExpression || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleConfigChange = (key, value) => {
    setFormConfig(prev => ({ ...prev, [key]: value }));
  };

  const saveConfig = async () => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/getmycourt/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: formConfig }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save config');
      }

      await fetchData(); // Refresh data
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveSchedule = async () => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/getmycourt/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduleExpression: formSchedule }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save schedule');
      }

      await fetchData(); // Refresh data
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleSchedule = async () => {
    setSaving(true);
    setError(null);

    try {
      const newState = schedule?.state === 'ENABLED' ? 'DISABLED' : 'ENABLED';
      const res = await fetch('/api/getmycourt/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to toggle schedule');
      }

      await fetchData(); // Refresh data
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded p-4">
        <h2 className="font-medium mb-2">GetMyCourt Bot</h2>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  const isEnabled = schedule?.state === 'ENABLED';

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-medium">GetMyCourt Bot</h2>
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Schedule Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Schedule</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={formSchedule}
            onChange={(e) => setFormSchedule(e.target.value)}
            placeholder="cron(0 6 * * ? *)"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
          <button
            onClick={saveSchedule}
            disabled={saving || formSchedule === schedule?.scheduleExpression}
            className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded disabled:opacity-50"
          >
            Save
          </button>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Timezone: {schedule?.timezone || 'UTC'}
          </p>
          <button
            onClick={toggleSchedule}
            disabled={saving}
            className={`px-3 py-1 text-xs rounded ${
              isEnabled
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            } disabled:opacity-50`}
          >
            {isEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Config Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Configuration</h3>
        <div className="space-y-2">
          <ConfigField
            label="Username"
            value={formConfig.USERNAME || ''}
            onChange={(v) => handleConfigChange('USERNAME', v)}
          />
          <ConfigField
            label="Password"
            value={formConfig.PASSWORD || ''}
            onChange={(v) => handleConfigChange('PASSWORD', v)}
            type="password"
          />
          <ConfigField
            label="Notification Email"
            value={formConfig.NOTIFICATION_EMAIL || ''}
            onChange={(v) => handleConfigChange('NOTIFICATION_EMAIL', v)}
            type="email"
          />
          <ConfigField
            label="Notification Phone"
            value={formConfig.NOTIFICATION_PHONE || ''}
            onChange={(v) => handleConfigChange('NOTIFICATION_PHONE', v)}
            placeholder="+1234567890"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="debug"
              checked={formConfig.DEBUG === 'true'}
              onChange={(e) => handleConfigChange('DEBUG', e.target.checked ? 'true' : 'false')}
              className="rounded"
            />
            <label htmlFor="debug" className="text-sm text-gray-700 dark:text-gray-300">
              Debug Mode
            </label>
          </div>
        </div>
        <button
          onClick={saveConfig}
          disabled={saving}
          className="w-full px-3 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>

      {/* Last Modified */}
      {config?.lastModified && (
        <p className="text-xs text-gray-500">
          Last modified: {new Date(config.lastModified).toLocaleString()}
        </p>
      )}
    </div>
  );
}

function ConfigField({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600 dark:text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
      />
    </div>
  );
}
