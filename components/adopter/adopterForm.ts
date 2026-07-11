import { IAdopter } from "@/interfaces/IAdopter";

export type AdopterFormValues = {
  name: string;
  firstName: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  householdComposition: string;
  roommatesCount: string;
  hasChildren: string;
  childrenCount: string;
  childrenAges: string;
  householdAgreement: string;
  disagreementDetails: string;
  workStatus: string;
  profession: string;
  workingHours: string;
  aloneTime: string;
  housingType: string;
  housingSurface: string;
  livingEnvironment: string;
  nearBusyRoad: string;
  petCanGoOutside: string;
  apartmentFloor: string;
  windowsSecured: string;
  planToSecureWindows: string;
  hasGarden: string;
  gardenSurface: string;
  gardenFenced: string;
  fenceHeight: string;
  hasBalconyOrTerrace: string;
  balconySurface: string;
  balconySecured: string;
  hasOtherAnimals: string;
  otherAnimalsDetails: string;
  sterilizedAnimals: string;
  petsSince: string;
  remarks: string;
  acceptsResponsibility: boolean;
};

export const adopterDefaultValues: AdopterFormValues = {
  name: "",
  firstName: "",
  email: "",
  password: "",
  birthDate: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  householdComposition: "",
  roommatesCount: "",
  hasChildren: "",
  childrenCount: "",
  childrenAges: "",
  householdAgreement: "",
  disagreementDetails: "",
  workStatus: "",
  profession: "",
  workingHours: "",
  aloneTime: "",
  housingType: "",
  housingSurface: "",
  livingEnvironment: "",
  nearBusyRoad: "",
  petCanGoOutside: "",
  apartmentFloor: "",
  windowsSecured: "",
  planToSecureWindows: "",
  hasGarden: "",
  gardenSurface: "",
  gardenFenced: "",
  fenceHeight: "",
  hasBalconyOrTerrace: "",
  balconySurface: "",
  balconySecured: "",
  hasOtherAnimals: "",
  otherAnimalsDetails: "",
  sterilizedAnimals: "",
  petsSince: "",
  remarks: "",
  acceptsResponsibility: false,
};

const stringValue = (value: unknown) =>
  typeof value === "string" ? value : value == null ? "" : String(value);

const booleanValue = (value: unknown) => value === true;
const yesNoValue = (value: unknown) => {
  if (value === true) return "oui";
  if (value === false) return "non";
  return stringValue(value);
};

export function mapAdopterToFormValues(
  adopter?: Partial<IAdopter> | null,
): AdopterFormValues {
  if (!adopter) return adopterDefaultValues;

  return {
    ...adopterDefaultValues,
    name: stringValue(adopter.name),
    firstName: stringValue(adopter.firstName),
    email: stringValue(adopter.email),
    birthDate: stringValue(adopter.birthDate),
    phone: stringValue(adopter.phone),
    address: stringValue(adopter.address),
    postalCode: stringValue(adopter.postalCode),
    city: stringValue(adopter.city),
    householdComposition: stringValue(adopter.householdComposition),
    roommatesCount: stringValue(adopter.roommatesCount),
    hasChildren: yesNoValue(adopter.hasChildren),
    childrenCount: stringValue(adopter.childrenCount),
    childrenAges: stringValue(adopter.childrenAges),
    householdAgreement: yesNoValue(adopter.householdAgreement),
    disagreementDetails: stringValue(adopter.disagreementDetails),
    workStatus: stringValue(adopter.workStatus),
    profession: stringValue(adopter.profession),
    workingHours: stringValue(adopter.workingHours),
    aloneTime: stringValue(adopter.aloneTime),
    housingType: stringValue(adopter.housingType),
    housingSurface: stringValue(adopter.housingSurface),
    livingEnvironment: stringValue(adopter.livingEnvironment),
    nearBusyRoad: stringValue(adopter.nearBusyRoad),
    petCanGoOutside: stringValue(adopter.petCanGoOutside),
    apartmentFloor: stringValue(adopter.apartmentFloor),
    windowsSecured: stringValue(adopter.windowsSecured),
    planToSecureWindows: stringValue(adopter.planToSecureWindows),
    hasGarden: stringValue(adopter.hasGarden),
    gardenSurface: stringValue(adopter.gardenSurface),
    gardenFenced: stringValue(adopter.gardenFenced),
    fenceHeight: stringValue(adopter.fenceHeight),
    hasBalconyOrTerrace: stringValue(adopter.hasBalconyOrTerrace),
    balconySurface: stringValue(adopter.balconySurface),
    balconySecured: stringValue(adopter.balconySecured),
    hasOtherAnimals: yesNoValue(adopter.hasOtherAnimals),
    otherAnimalsDetails: stringValue(adopter.otherAnimalsDetails),
    sterilizedAnimals: yesNoValue(adopter.sterilizedAnimals),
    petsSince: stringValue(adopter.petsSince),
    remarks: stringValue(adopter.remarks),
    acceptsResponsibility: booleanValue(adopter.acceptsResponsibility),
  };
}

export function buildAdopterFormData(
  values: AdopterFormValues,
): FormData {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      formData.set(key, value ? "true" : "false");
      return;
    }

    const trimmed = value.trim();
    if (trimmed.length > 0) {
      formData.set(key, trimmed);
    }
  });

  return formData;
}

export function getRequiredField(
  formData: FormData,
  key: keyof AdopterFormValues,
  label: string,
) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    return { error: `${label} est requis.` } as const;
  }

  return { value: value.trim() } as const;
}

export function getOptionalField(
  formData: FormData,
  key: keyof AdopterFormValues,
) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getBooleanField(
  formData: FormData,
  key: keyof AdopterFormValues,
) {
  const value = formData.get(key);

  if (value === "true" || value === "oui") return true;
  if (value === "false" || value === "non") return false;

  return null;
}

export function getNumberField(
  formData: FormData,
  key: keyof AdopterFormValues,
) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const number = Number(trimmed);
  return Number.isFinite(number) ? number : null;
}

export function buildAdopterPayload(
  formData: FormData,
  options: { includePassword: boolean },
) {
  const name = getRequiredField(formData, "name", "Le nom");
  if ("error" in name) return name;

  const firstName = getRequiredField(formData, "firstName", "Le prénom");
  if ("error" in firstName) return firstName;

  const email = getRequiredField(formData, "email", "L'email");
  if ("error" in email) return email;

  if (options.includePassword) {
    const password = getRequiredField(formData, "password", "Le mot de passe");
    if ("error" in password) return password;

    return {
      data: {
        name: name.value,
        firstName: firstName.value,
        email: email.value,
        password: password.value,
        birthDate: getOptionalField(formData, "birthDate"),
        phone: getOptionalField(formData, "phone"),
        address: getOptionalField(formData, "address"),
        postalCode: getOptionalField(formData, "postalCode"),
        city: getOptionalField(formData, "city"),
        householdComposition: getOptionalField(formData, "householdComposition"),
        roommatesCount: getNumberField(formData, "roommatesCount"),
        hasChildren: getBooleanField(formData, "hasChildren"),
        childrenCount: getNumberField(formData, "childrenCount"),
        childrenAges: getOptionalField(formData, "childrenAges"),
        householdAgreement: getBooleanField(formData, "householdAgreement"),
        disagreementDetails: getOptionalField(formData, "disagreementDetails"),
        workStatus: getOptionalField(formData, "workStatus"),
        profession: getOptionalField(formData, "profession"),
        workingHours: getOptionalField(formData, "workingHours"),
        aloneTime: getOptionalField(formData, "aloneTime"),
        housingType: getOptionalField(formData, "housingType"),
        housingSurface: getOptionalField(formData, "housingSurface"),
        livingEnvironment: getOptionalField(formData, "livingEnvironment"),
        nearBusyRoad: getOptionalField(formData, "nearBusyRoad"),
        petCanGoOutside: getOptionalField(formData, "petCanGoOutside"),
        apartmentFloor: getNumberField(formData, "apartmentFloor"),
        windowsSecured: getOptionalField(formData, "windowsSecured"),
        planToSecureWindows: getOptionalField(formData, "planToSecureWindows"),
        hasGarden: getOptionalField(formData, "hasGarden"),
        gardenSurface: getOptionalField(formData, "gardenSurface"),
        gardenFenced: getOptionalField(formData, "gardenFenced"),
        fenceHeight: getOptionalField(formData, "fenceHeight"),
        hasBalconyOrTerrace: getOptionalField(formData, "hasBalconyOrTerrace"),
        balconySurface: getOptionalField(formData, "balconySurface"),
        balconySecured: getOptionalField(formData, "balconySecured"),
        hasOtherAnimals: getBooleanField(formData, "hasOtherAnimals"),
        otherAnimalsDetails: getOptionalField(formData, "otherAnimalsDetails"),
        sterilizedAnimals: getBooleanField(formData, "sterilizedAnimals"),
        petsSince: getOptionalField(formData, "petsSince"),
        remarks: getOptionalField(formData, "remarks"),
        acceptsResponsibility: getBooleanField(formData, "acceptsResponsibility"),
      },
    } as const;
  }

  return {
    data: {
      name: name.value,
      firstName: firstName.value,
      email: email.value,
      birthDate: getOptionalField(formData, "birthDate"),
      phone: getOptionalField(formData, "phone"),
      address: getOptionalField(formData, "address"),
      postalCode: getOptionalField(formData, "postalCode"),
      city: getOptionalField(formData, "city"),
      householdComposition: getOptionalField(formData, "householdComposition"),
      roommatesCount: getNumberField(formData, "roommatesCount"),
      hasChildren: getBooleanField(formData, "hasChildren"),
      childrenCount: getNumberField(formData, "childrenCount"),
      childrenAges: getOptionalField(formData, "childrenAges"),
      householdAgreement: getBooleanField(formData, "householdAgreement"),
      disagreementDetails: getOptionalField(formData, "disagreementDetails"),
      workStatus: getOptionalField(formData, "workStatus"),
      profession: getOptionalField(formData, "profession"),
      workingHours: getOptionalField(formData, "workingHours"),
      aloneTime: getOptionalField(formData, "aloneTime"),
      housingType: getOptionalField(formData, "housingType"),
      housingSurface: getOptionalField(formData, "housingSurface"),
      livingEnvironment: getOptionalField(formData, "livingEnvironment"),
      nearBusyRoad: getOptionalField(formData, "nearBusyRoad"),
      petCanGoOutside: getOptionalField(formData, "petCanGoOutside"),
      apartmentFloor: getNumberField(formData, "apartmentFloor"),
      windowsSecured: getOptionalField(formData, "windowsSecured"),
      planToSecureWindows: getOptionalField(formData, "planToSecureWindows"),
      hasGarden: getOptionalField(formData, "hasGarden"),
      gardenSurface: getOptionalField(formData, "gardenSurface"),
      gardenFenced: getOptionalField(formData, "gardenFenced"),
      fenceHeight: getOptionalField(formData, "fenceHeight"),
      hasBalconyOrTerrace: getOptionalField(formData, "hasBalconyOrTerrace"),
      balconySurface: getOptionalField(formData, "balconySurface"),
      balconySecured: getOptionalField(formData, "balconySecured"),
      hasOtherAnimals: getBooleanField(formData, "hasOtherAnimals"),
      otherAnimalsDetails: getOptionalField(formData, "otherAnimalsDetails"),
      sterilizedAnimals: getBooleanField(formData, "sterilizedAnimals"),
      petsSince: getOptionalField(formData, "petsSince"),
      remarks: getOptionalField(formData, "remarks"),
      acceptsResponsibility: getBooleanField(formData, "acceptsResponsibility"),
    },
  } as const;
}