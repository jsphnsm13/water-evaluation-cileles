export interface MonitoringLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  pH: number;
  ec: number;
  tds: number;
}

export const monitoringLocations: MonitoringLocation[] = [
  { id: 'TA01', name: 'Titik TA01', latitude: -6.911565191, longitude: 107.7753386, pH: 4.8, ec: 0.33, tds: 246 },
  { id: 'TA02', name: 'Titik TA02', latitude: -6.909919919, longitude: 107.7739089, pH: 4.1, ec: 0.42, tds: 306 },
  { id: 'TA03', name: 'Titik TA03', latitude: -6.911622602, longitude: 107.7752822, pH: 4.6, ec: 0.37, tds: 270 },
  { id: 'TA04', name: 'Titik TA04', latitude: -6.923259731, longitude: 107.7795163, pH: 5.4, ec: 0.43, tds: 312 },
  { id: 'TA05', name: 'Titik TA05', latitude: -6.909740587, longitude: 107.7778903, pH: 5.1, ec: 0.25, tds: 176 },
  { id: 'TA06', name: 'Titik TA06', latitude: -6.916611099, longitude: 107.7798407, pH: 6.0, ec: 0.2, tds: 150 },
  { id: 'TA07', name: 'Titik TA07', latitude: -6.910824901, longitude: 107.7749794, pH: 5.1, ec: 0.12, tds: 97 },
  { id: 'TA08', name: 'Titik TA08', latitude: -6.909882827, longitude: 107.7765116, pH: 5.4, ec: 0.25, tds: 189 },
  { id: 'TA09', name: 'Titik TA09', latitude: -6.909530094, longitude: 107.778348, pH: 5.3, ec: 0.31, tds: 224 },
  { id: 'TA10', name: 'Titik TA10', latitude: -6.909208049, longitude: 107.7743476, pH: 4.5, ec: 0.11, tds: 85 },
  { id: 'TA11', name: 'Titik TA11', latitude: -6.914132792, longitude: 107.780042, pH: 5.2, ec: 0.16, tds: 122 },
  { id: 'TA12', name: 'Titik TA12', latitude: -6.914351562, longitude: 107.7799395, pH: 4.9, ec: 0.19, tds: 157 },
  { id: 'TA13', name: 'Titik TA13', latitude: -6.909945056, longitude: 107.7739756, pH: 3.8, ec: 0.39, tds: 286 },
  { id: 'TA14', name: 'Titik TA14', latitude: -6.906786676, longitude: 107.7813997, pH: 4.9, ec: 0.15, tds: 120 },
  { id: 'TA15', name: 'Titik TA15', latitude: -6.91197908, longitude: 107.7794331, pH: 5.0, ec: 0.31, tds: 227 },
  { id: 'TA16', name: 'Titik TA16', latitude: -6.911089366, longitude: 107.7802174, pH: 5.4, ec: 0.19, tds: 149 },
];

export function getStatusFromPH(pH: number): 'safe' | 'warning' | 'danger' {
  if (pH >= 6.5 && pH <= 8.5) return 'safe';
  if (pH >= 5.5 && pH < 6.5) return 'warning';
  return 'danger';
}

export function getStatusFromTDS(tds: number): 'safe' | 'warning' | 'danger' {
  if (tds < 300) return 'safe';
  if (tds >= 300 && tds < 500) return 'warning';
  return 'danger';
}

export function getStatusFromEC(ec: number): 'safe' | 'warning' | 'danger' {
  // EC in mS/cm, convert to µS/cm for comparison
  const ecInMicroSiemens = ec * 1000;
  if (ecInMicroSiemens < 800) return 'safe';
  if (ecInMicroSiemens >= 800 && ecInMicroSiemens < 1000) return 'warning';
  return 'danger';
}

export function getOverallStatus(location: MonitoringLocation): 'safe' | 'warning' | 'danger' {
  const pHStatus = getStatusFromPH(location.pH);
  const tdsStatus = getStatusFromTDS(location.tds);
  const ecStatus = getStatusFromEC(location.ec);
  
  // If any parameter is danger, overall is danger
  if (pHStatus === 'danger' || tdsStatus === 'danger' || ecStatus === 'danger') {
    return 'danger';
  }
  
  // If any parameter is warning, overall is warning
  if (pHStatus === 'warning' || tdsStatus === 'warning' || ecStatus === 'warning') {
    return 'warning';
  }
  
  return 'safe';
}

export function getAverageMetrics() {
  const totalLocations = monitoringLocations.length;
  const avgPH = monitoringLocations.reduce((sum, loc) => sum + loc.pH, 0) / totalLocations;
  const avgTDS = monitoringLocations.reduce((sum, loc) => sum + loc.tds, 0) / totalLocations;
  const avgEC = monitoringLocations.reduce((sum, loc) => sum + loc.ec, 0) / totalLocations;
  
  return {
    pH: parseFloat(avgPH.toFixed(2)),
    tds: parseFloat(avgTDS.toFixed(0)),
    ec: parseFloat(avgEC.toFixed(2)),
  };
}