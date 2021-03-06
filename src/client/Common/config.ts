import { ChangeEvent } from 'react';
import { StationSearchType } from 'types/station';

export enum CheckInType {
  None,
  Travelynx,
}

export interface AbfahrtenConfig {
  readonly searchType: StationSearchType;
  readonly showSupersededMessages: boolean;
  readonly lookahead: string;
  readonly lookbehind: string;
  readonly lineAndNumber: boolean;
  readonly autoUpdate: number;
}

export interface CommonConfig {
  readonly time: boolean;
  readonly checkIn: CheckInType;
  readonly zoomReihung: boolean;
  readonly showUIC: boolean;
  readonly fahrzeugGruppe: boolean;
}

type Sanitize<Config> = {
  [K in keyof Config]: (input: string) => Config[K];
};

export type AbfahrtenConfigSanitize = Sanitize<AbfahrtenConfig>;
export type CommonConfigSanitize = Sanitize<CommonConfig>;

export function handleConfigCheckedChange<
  K extends keyof AbfahrtenConfig | keyof CommonConfig,
  SC extends (k: K, value: any) => void
>(key: K, setConfig: SC) {
  return (e: ChangeEvent<HTMLInputElement>) =>
    setConfig(key, e.currentTarget.checked);
}

export function handleConfigNumberSelectChange<
  K extends keyof AbfahrtenConfig | keyof CommonConfig,
  SC extends (k: K, value: any) => void
>(key: K, setConfig: SC) {
  return (e: ChangeEvent<HTMLSelectElement>) =>
    setConfig(key, Number.parseInt(e.currentTarget.value, 10));
}
