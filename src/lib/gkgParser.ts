import { parse } from 'csv-parse/sync';

export interface GKGRecord {
  GKGRECORDID: string;
  DATE: string;
  SourceCollectionIdentifier: number;
  SourceCommonName: string;
  DocumentIdentifier: string;
  Counts: string;
  V2Counts: string;
  Themes: string;
  V2Themes: string;
  Locations: string;
  V2Locations: string;
  Persons: string;
  V2Persons: string;
  Organizations: string;
  V2Organizations: string;
  V2Tone: string;
  Dates: string;
  GCAM: string;
  SharingImage: string;
  RelatedImages: string;
  SocialImageEmbeds: string;
  SocialVideoEmbeds: string;
  Quotations: string;
  AllNames: string;
  Amounts: string;
  TranslationInfo: string;
  Extras: string;
}

export function parseGKGData(csvData: string): GKGRecord[] {
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    delimiter: '\t',
  });

  return records.map((record: any) => ({
    GKGRECORDID: record.GKGRECORDID,
    DATE: record.DATE,
    SourceCollectionIdentifier: parseInt(record.SourceCollectionIdentifier),
    SourceCommonName: record.SourceCommonName,
    DocumentIdentifier: record.DocumentIdentifier,
    Counts: record.Counts,
    V2Counts: record.V2Counts,
    Themes: record.Themes,
    V2Themes: record.V2Themes,
    Locations: record.Locations,
    V2Locations: record.V2Locations,
    Persons: record.Persons,
    V2Persons: record.V2Persons,
    Organizations: record.Organizations,
    V2Organizations: record.V2Organizations,
    V2Tone: record.V2Tone,
    Dates: record.Dates,
    GCAM: record.GCAM,
    SharingImage: record.SharingImage,
    RelatedImages: record.RelatedImages,
    SocialImageEmbeds: record.SocialImageEmbeds,
    SocialVideoEmbeds: record.SocialVideoEmbeds,
    Quotations: record.Quotations,
    AllNames: record.AllNames,
    Amounts: record.Amounts,
    TranslationInfo: record.TranslationInfo,
    Extras: record.Extras,
  }));
}

export function extractThemes(gkgRecord: GKGRecord): string[] {
  return gkgRecord.V2Themes.split(';')
    .filter(theme => theme.trim() !== '')
    .map(theme => theme.split(',')[0]);
}

export function extractLocations(gkgRecord: GKGRecord): string[] {
  return gkgRecord.V2Locations.split(';')
    .filter(location => location.trim() !== '')
    .map(location => location.split('#')[1]);
}

export function extractOrganizations(gkgRecord: GKGRecord): string[] {
  return gkgRecord.V2Organizations.split(';')
    .filter(org => org.trim() !== '')
    .map(org => org.split(',')[0]);
} 