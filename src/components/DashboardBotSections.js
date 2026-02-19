'use client';

import { useEffect, useId, useState } from 'react';

const BOTS = [
  {
    key: 'teetime',
    title: 'GetMyTeeTime Bot',
    description: 'Tee time automation config, schedule, and test invoke.',
    configEndpoint: '/api/getmyteetime/config',
    scheduleEndpoint: '/api/getmyteetime/schedule',
  },
  {
    key: 'court',
    title: 'GetMyCourt Bot',
    description: 'Court reservation automation config and schedule settings.',
    configEndpoint: '/api/getmycourt/config',
    scheduleEndpoint: '/api/getmycourt/schedule',
  },
];

export default function DashboardBotSections({ teeTimeWidget, courtWidget }) {
  const [openBot, setOpenBot] = useState(null);
  const [headerMeta, setHeaderMeta] = useState({});
  const baseId = useId();

  const contentByBot = {
    teetime: teeTimeWidget,
    court: courtWidget,
  };

  useEffect(() => {
    let cancelled = false;

    const loadHeaderMeta = async () => {
      const results = await Promise.all(
        BOTS.map(async (bot) => {
          try {
            const [configRes, scheduleRes] = await Promise.all([
              fetch(bot.configEndpoint),
              fetch(bot.scheduleEndpoint),
            ]);

            if (!configRes.ok || !scheduleRes.ok) {
              throw new Error('Failed to load');
            }

            const configPayload = await configRes.json();
            const schedulePayload = await scheduleRes.json();
            return [
              bot.key,
              {
                state: schedulePayload?.state,
                lastModified: configPayload?.lastModified,
              },
            ];
          } catch {
            return [
              bot.key,
              {
                state: null,
                lastModified: null,
              },
            ];
          }
        })
      );

      if (!cancelled) {
        setHeaderMeta(Object.fromEntries(results));
      }
    };

    void loadHeaderMeta();
    const onBotMetaUpdated = () => {
      void loadHeaderMeta();
    };
    window.addEventListener('dashboard:bot-meta-updated', onBotMetaUpdated);

    return () => {
      cancelled = true;
      window.removeEventListener('dashboard:bot-meta-updated', onBotMetaUpdated);
    };
  }, []);

  return (
    <div className="space-y-4">
      {BOTS.map((bot) => {
        const isOpen = openBot === bot.key;
        const panelId = `${baseId}-${bot.key}-panel`;
        const meta = headerMeta[bot.key];
        const isEnabled = meta?.state === 'ENABLED';
        const statusLabel = meta?.state ? (isEnabled ? 'Enabled' : 'Disabled') : 'Status unavailable';
        const lastModifiedLabel = meta?.lastModified
          ? `Last modified ${new Date(meta.lastModified).toLocaleString()}`
          : 'Last modified unavailable';

        return (
          <section key={bot.key} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <h2>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenBot((prev) => (prev === bot.key ? null : bot.key))}
              >
                <span>
                  <span className="block text-base font-semibold text-gray-900">{bot.title}</span>
                  <span className="block text-sm text-gray-600">{bot.description}</span>
                  <span className="mt-1 block text-xs text-gray-500">{lastModifiedLabel}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {statusLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-lg leading-none text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    v
                  </span>
                </span>
              </button>
            </h2>
            {isOpen && (
              <div id={panelId} className="border-t border-gray-200 bg-gray-50 p-4">
                {contentByBot[bot.key]}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
