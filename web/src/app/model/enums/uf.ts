export enum UF {
  AMAZONAS = "AM",
  ALAGOAS = "AL",
  ACRE = "AC",
  AMAPA = "AP",
  BAHIA = "BA",
  PARA = "PA",
  MATO_GROSSO = "MT",
  MINAS_GERAIS = "MG",
  MATO_GROSSO_DO_SUL = "MS",
  GOIAS = "GO",
  MARANHAO = "MA",
  RIO_GRANDE_DO_SUL = "RS",
  TOCANTINS = "TO",
  PIAUI = "PI",
  SAO_PAULO = "SP",
  RONDONIA = "RO",
  RORAIMA = "RR",
  PARANA = "PR",
  CEARA = "CE",
  PERNAMBUCO = "PE",
  SANTA_CATARINA = "SC",
  PARAIBA = "PB",
  RIO_GRANDE_DO_NORTE = "RN",
  ESPIRITO_SANTO = "ES",
  RIO_DE_JANEIRO = "RJ",
  SERGIPE = "SE",
  DISTRITO_FEDERAL = "DF",

}

export function toUF(value: unknown): UF {
  const v = String(value ?? '').trim().toUpperCase();
  if ((Object.values(UF) as string[]).includes(v)) return v as UF;
  throw new Error(`UF inválida: "${value}"`);
}
