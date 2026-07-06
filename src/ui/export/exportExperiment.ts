import type { ReadonlyWorldSnapshot } from '../../simulation';

export type ExperimentExportDocument = Readonly<{
  schemaVersion: 'experiment-export-v0.1';
  exportedAt: string;
  experiment: ReadonlyWorldSnapshot['experiment'];
  seed: number;
  currentTick: number;
  statistics: ReadonlyWorldSnapshot['stats'];
  interventionHistory: ReadonlyWorldSnapshot['interventionHistory'];
  events: ReadonlyWorldSnapshot['events'];
  replayStatus: 'pending';
  notes: string;
}>;

export const createExperimentExport = (snapshot: ReadonlyWorldSnapshot, exportedAt = new Date().toISOString()): ExperimentExportDocument => ({
  schemaVersion: 'experiment-export-v0.1',
  exportedAt,
  experiment: snapshot.experiment,
  seed: snapshot.experiment.seed,
  currentTick: snapshot.experiment.currentTick,
  statistics: snapshot.stats,
  interventionHistory: snapshot.interventionHistory,
  events: snapshot.events,
  replayStatus: 'pending',
  notes: 'Exportación v0.1: replay completo, guardado y carga de escenarios están pendientes.'
});

const buildExportFileName = (snapshot: ReadonlyWorldSnapshot): string => {
  const safeId = snapshot.experiment.experimentId.replace(/[^a-zA-Z0-9-_]/g, '-');
  return `${safeId}-tick-${snapshot.experiment.currentTick}.json`;
};

export const downloadExperimentExport = (snapshot: ReadonlyWorldSnapshot): void => {
  const documentContent = createExperimentExport(snapshot);
  const blob = new Blob([JSON.stringify(documentContent, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = buildExportFileName(snapshot);
  link.click();
  URL.revokeObjectURL(url);
};
