"use client";

import {
  collection,
  getDocs,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "@/library/components/Table";
import {
  BarList,
  Card,
  Dialog,
  DialogPanel,
  DonutChart,
  Legend,
  LineChart,
  BarChart,
  Select,
  SelectItem,
  TextInput,
  Button,
} from "@tremor/react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { X } from "lucide-react";

function ExportarExcel({ data }) {
  const exportar = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Hoja1");

    // Convertir los nombres de las claves en un array y agregarlos como la primera fila
    worksheet.addRow(Object.keys(data[0]));

    // Agregar los datos
    data.forEach((entry) => {
      worksheet.addRow(Object.values(entry));
    });

    // Exportar a buffer y guardar como archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "data.xlsx");
  };

  return (
    <div
      className="relative items-center hidden px-2 ml-2 -mt-1 border border-gray-300 rounded-md cursor-pointer sm:flex hover:bg-gray-50"
      onClick={exportar}
      style={{
        height: "2.25rem",
      }}
    >
      <svg
        className="w-5 h-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 12.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V12.5M14.1667 8.33333L10 12.5M10 12.5L5.83333 8.33333M10 12.5V2.5"
          stroke="#344054"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

function EditData({ editValue }) {
  const db = getFirestore();
  const [loader, setLoader] = useState(false);

  // Función para inicializar los datos de facturación
  const initializeBillingData = () => {
    const { billinding } = { ...editValue };
    console.log(billinding);
    return {
      accounts: billinding.accounts || 0,
      additional_accounts: billinding.additional_accounts || 0,
      additionalAccountsPrice: billinding.additionalAccountsPrice || 0,
      frecuency:
        billinding.frecuency === 1
          ? "mensual"
          : billinding.frecuency === 3
          ? "trimestral"
          : billinding.frecuency === 6
          ? "semestral"
          : "anual",
      plan: billinding.plan || "",
      planPrice: billinding.planPrice || 0,
      state: billinding.state ? "activada" : "desactivada",
      identificationNumber: billinding.identificationNumber || "",
      identificationType: billinding.identificationType || "DNI",
    };
  };

  const [billing, setBilling] = useState(initializeBillingData());

  // Función genérica para manejar cambios en los campos
  const handleInputChange = (field) => (value) => {
    setBilling((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Función para actualizar la información
  const updateInformation = async () => {
    setLoader(true);
    const orgRef = doc(db, "organizations", editValue.org.org_id);

    try {
      const newBilling = {
        ...editValue.billinding,
        accounts: Number(billing.accounts),
        additional_accounts: Number(billing.additional_accounts),
        additionalAccountsPrice: Number(billing.additionalAccountsPrice),
        plan: billing.plan,
        frecuency:
          billing.frecuency === "mensual"
            ? 1
            : billing.frecuency === "trimestral"
            ? 3
            : billing.frecuency === "semestral"
            ? 6
            : 12,
        planPrice: Number(billing.planPrice),
        state: billing.state === "activada",
        startDate: Date.now(),
        identificationNumber: billing.identificationNumber,
        identificationType: billing.identificationType,
        canceledDate:
          editValue.billinding.state && billing.state === "desactivada"
            ? Date.now()
            : null,
        reactivatedDate:
          !editValue.billinding.state &&
          billing.state === "activada" &&
          editValue.billinding.canceledDate
            ? Date.now()
            : null,
      };
      await updateDoc(orgRef, {
        billinding: newBilling,
      });
      location.reload();
    } catch (error) {
      console.error("Error al actualizar el item:", error);
      alert("Error al actualizar el item");
      setLoader(false);
    }
  };

  // Función para eliminar la organización
  const deleteOrg = async () => {
    setLoader(true);
    const orgRef = doc(db, "organizations", editValue.org.org_id);

    try {
      await updateDoc(orgRef, {
        "billinding.countDeleted": true,
        "billinding.deletedDate": Date.now(),
      });
      // Logica para eliminar la organización
      location.reload();
    } catch (error) {
      console.error("Error al desactivar:", error);
      alert("Error al desactivar");
      setLoader(false);
    }
  };
  return (
    <>
      {loader ? (
        <div className="flex items-center justify-center w-full h-full my-6">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {/* Campos del formulario */}
          <div className="mt-2">
            {/* Suscripción */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Suscripción
              </label>
              <Select
                value={billing.state}
                onValueChange={handleInputChange("state")}
              >
                <SelectItem value="activada">Activada</SelectItem>
                <SelectItem value="desactivada">Desactivada</SelectItem>
              </Select>
            </div>

            {/* Plan actual */}
            <div className="mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Plan actual
              </label>
              <Select
                value={billing.plan}
                onValueChange={handleInputChange("plan")}
              >
                <SelectItem value="">Seleccione el plan</SelectItem>
                <SelectItem value="Plan Lite">Plan Lite</SelectItem>
                <SelectItem value="Plan Basico">Plan Básico</SelectItem>
                <SelectItem value="Plan Pro">Plan Pro</SelectItem>
              </Select>
            </div>

            {/* Frecuencia */}
            <div className="mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Frecuencia
              </label>
              <Select
                value={billing.frecuency}
                onValueChange={handleInputChange("frecuency")}
              >
                <SelectItem value="">Seleccione una frecuencia</SelectItem>
                <SelectItem value="mensual">Mensual</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {/* Número de cuentas */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  N° Cuentas
                </label>
                <TextInput
                  placeholder="N° Cuentas"
                  type="number"
                  value={billing.accounts}
                  onChange={(e) =>
                    handleInputChange("accounts")(e.target.value)
                  }
                />
              </div>

              {/* Cuentas adicionales */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  N° C. Adicionales
                </label>
                <TextInput
                  placeholder="N° C. Adicionales"
                  type="number"
                  value={billing.additional_accounts}
                  onChange={(e) =>
                    handleInputChange("additional_accounts")(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {/* Precio del plan */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Precio Plan
                </label>
                <TextInput
                  placeholder="Precio Plan"
                  type="number"
                  value={billing.planPrice}
                  onChange={(e) =>
                    handleInputChange("planPrice")(e.target.value)
                  }
                />
              </div>

              {/* Precio de cuentas adicionales */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Precio C. Adicionales
                </label>
                <TextInput
                  placeholder=" Precio C. Adicionales"
                  type="number"
                  value={billing.additionalAccountsPrice}
                  onChange={(e) =>
                    handleInputChange("additionalAccountsPrice")(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {/* Tipo de identificación */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tipo de Identificación
                </label>
                <Select
                  value={billing.identificationType}
                  onValueChange={handleInputChange("identificationType")}
                >
                  <SelectItem value="DNI">DNI</SelectItem>
                  <SelectItem value="RUC">RUC</SelectItem>
                </Select>
              </div>

              {/* Número de identificación */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  N° Identificación
                </label>
                <TextInput
                  placeholder="N° Identificación"
                  value={billing.identificationNumber}
                  onChange={(e) =>
                    handleInputChange("identificationNumber")(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end mt-6">
            <Button variant="primary" onClick={() => deleteOrg()} color="red">
              Eliminar
            </Button>
            <Button
              variant="primary"
              onClick={() => updateInformation()}
              className="ml-2"
              color="green"
            >
              Actualizar
            </Button>
          </div>
        </>
      )}
    </>
  );
}

function User({ editValue, ...props }) {
  function transformAttentionsData(data) {
    const stats = data.stats || [];

    // Sort stats by date descending
    stats.sort((a, b) => {
      const dateA = new Date(a.year, a.month);
      const dateB = new Date(b.year, b.month);
      return dateB - dateA; // descending
    });

    // Take the last 10 months max
    const last10Months = stats.slice(0, 10);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const result = last10Months
      .map((item) => {
        const monthAbbr = monthNames[item.month];
        const yearStr = String(item.year).slice(-2);
        return {
          date: `${monthAbbr} ${yearStr}`,
          atenciones: item.atenciones,
        };
      })
      .reverse(); // Reverse to chronological order

    return result;
  }
  const data = [
    {
      name: "Pacientes",
      stat: editValue.patientsCount,
      change: "↑",
      changeType: "positive",
    },
    {
      name: "Citas",
      stat: editValue.appointmentsCount,
      change: "↑",
      changeType: "positive",
    },
    {
      name: "Pagos",
      stat: editValue.paymentsCount,
      change: "↑",
      changeType: "positive",
    },
  ];
  // console.log(props.editValue);
  return (
    <Dialog open={true} onClose={() => {}} static={true} className="z-[100]">
      <DialogPanel className="w-full sm:max-w-3xl">
        <div className="absolute top-0 right-0 pt-3 pr-3">
          <button
            type="button"
            className="p-2 rounded-tremor-small text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
            onClick={() => props.setIsEditModalVisible(false)}
            aria-label="Close"
          >
            <X className="size-5 shrink-0" aria-hidden={true} />
          </button>
        </div>
        <div>
          <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {editValue.adminName}
          </h4>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span className="font-semibold">Organización:</span>{" "}
            {editValue.orgName}
          </p>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span className="font-semibold">E-mail:</span>{" "}
            {editValue.adminEmail}
          </p>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span className="font-semibold">Teléfono:</span>{" "}
            {editValue.adminPhone}
          </p>
          <dl className="grid grid-cols-1 gap-2 my-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <Card key={item.name}>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-500">
                    {item.name}
                  </dt>
                  <span
                    className={classNames(
                      item.changeType === "positive"
                        ? "bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20"
                        : "bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20",
                      "inline-flex items-center rounded-md p-1 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {item.change}
                  </span>
                </div>
                <dd className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  {item.stat}
                </dd>
              </Card>
            ))}
          </dl>

          <Card className="my-2">
            <div className="flex">
              <h1 className="mb-4">Atenciones por mes</h1>
            </div>
            <LineChart
              className="h-80"
              data={transformAttentionsData(editValue)}
              index="date"
              yAxisWidth={65}
              categories={["atenciones"]}
              colors={["green"]}
              xAxisLabel="Mes del año"
              yAxisLabel="Atenciones"
              tickGap={0}
            />
          </Card>

          <EditData editValue={editValue} />
        </div>
      </DialogPanel>
    </Dialog>
  );
}

// Common
const tremorColors = [
  "blue",
  "cyan",
  "indigo",
  "violet",
  "fuchsia",
  "rose",
  "purple",
  "teal",
  "emerald",
  "amber",
  "red",
  "orange",
  "yellow",
  "green",
  "lime",
];

function hslToHex(hsl) {
  const [h, s, l] = hsl.match(/\d+/g).map(Number);
  const sRatio = s / 100;
  const lRatio = l / 100;

  const c = (1 - Math.abs(2 * lRatio - 1)) * sRatio;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lRatio - c / 2;

  let [r, g, b] = [0, 0, 0];
  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
  else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
  else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
  else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
  else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x];

  r = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0");
  g = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0");
  b = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
}

function generateColorPalette(count) {
  const generatedColors = [];

  for (let i = 0; i < count; i++) {
    if (i < tremorColors.length) {
      generatedColors.push(tremorColors[i]);
    } else {
      // Generar color hexadecimal suave si se exceden los colores predeterminados
      const hue = (i * 137.5) % 360; // Usar 137.5 grados para la generación de colores espaciados
      const pastelColor = `hsl(${hue}, 50%, 80%)`; // HSL con saturación media y luminosidad alta
      generatedColors.push(hslToHex(pastelColor));
    }
  }

  return generatedColors;
}

// Utils
const formatDate = (timestamp) => {
  if (!timestamp || isNaN(timestamp)) {
    return "-";
  }
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("es-ES");
  return formattedDate;
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Especialidad
function transformSpecialtyData(dataArray) {
  const specialtyCount = {};

  dataArray.forEach((data) => {
    data.profiles?.forEach((profile) => {
      // Tomar la especialidad y estandarizar tildes y espacios
      // console.log(profile);

      let specialty = profile?.specialty?.trim() || "";

      // Reemplazar si es vacío o no está definido
      if (!specialty) {
        specialty = "No registra";
      }

      // Estandarización de tildes y espacios vacíos
      specialty = specialty
        .toLowerCase()
        .replace(/á/g, "a")
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u");

      // Contar la especialidad
      if (!specialtyCount[specialty]) {
        specialtyCount[specialty] = 0;
      }

      specialtyCount[specialty]++;
    });
  });

  // Convertir el resultado a un array de objetos
  const result = Object.entries(specialtyCount).map(([name, value]) => ({
    name,
    value,
  }));

  return result;
}
// Ative subs
function generateActiveSubsPerMonth(subscriptions) {
  // 1. Definir el rango de fechas (últimos 10 meses)
  const monthsArray = [];
  const now = new Date();
  const earliestDateInPeriod = new Date(
    now.getFullYear(),
    now.getMonth() - 9,
    1
  ); // Inicio del periodo

  for (let i = 9; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthsArray.push(date);
  }

  // 2. Construir los periodos activos para cada suscripción
  const subscriptionActivePeriods = {};

  subscriptions.forEach((sub) => {
    const billing = sub.billinding;
    const subID = billing.subID;
    const state = billing.state;
    let startDate = billing.startDate;

    // Considerar startDate válido solo si es un número (timestamp)
    let eventDate;
    if (typeof startDate === "number" && !isNaN(startDate)) {
      eventDate = new Date(startDate);
    } else {
      eventDate = null; // Fecha inválida
    }

    if (!subscriptionActivePeriods[subID]) {
      subscriptionActivePeriods[subID] = [];
    }

    if (state) {
      // Si state es true
      if (eventDate) {
        // startDate válido
        // Suscripción activa desde startDate hasta ahora
        subscriptionActivePeriods[subID].push({
          start: eventDate,
          end: now,
        });
      } else {
        // startDate inválido
        // Suscripción activa en todos los meses (desde earliestDateInPeriod hasta ahora)
        subscriptionActivePeriods[subID].push({
          start: earliestDateInPeriod,
          end: now,
        });
      }
    } else {
      // Si state es false
      if (eventDate) {
        // startDate válido
        // Suscripción activa desde startDate durante un mes
        let endDate = new Date(eventDate);
        endDate.setMonth(endDate.getMonth() + 1);
        subscriptionActivePeriods[subID].push({
          start: eventDate,
          end: endDate,
        });
      }
      // startDate inválido y state es false, no se cuenta
    }
  });

  // 3. Contar suscripciones activas por mes
  const result = monthsArray.map((monthDate) => {
    const monthStart = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      1
    );
    const monthEnd = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    let activeSubs = 0;
    for (const subID in subscriptionActivePeriods) {
      const periods = subscriptionActivePeriods[subID];
      const isActive = periods.some((period) => {
        // Verificar si el periodo activo coincide con el mes
        return period.start <= monthEnd && period.end >= monthStart;
      });
      if (isActive) {
        activeSubs++;
      }
    }
    const monthName = monthDate.toLocaleString("es-ES", { month: "short" });
    const year = monthDate.getFullYear().toString().slice(-2);
    return {
      date: `${monthName} ${year}`,
      activeSubs,
    };
  });

  // 4. +34 para ajustar las subs de la versión anterior, - 10 para ajustar las subs de prueba
  result.forEach((item) => {
    item.activeSubs = Math.max(0, item.activeSubs + 24);
  });

  return result;
}
// Kpis
function generateKPIs(subscriptions) {
  // Variables para almacenar los KPIs
  let totalAccounts = 0;
  let activeSubscriptions = 0;
  let canceledSubscriptions = 0;
  let previousMonthActive = 0;

  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  );

  subscriptions.forEach((sub) => {
    const billing = sub.billinding;
    const state = billing.state;
    let startDate = billing.startDate;
    let eventDate;

    // Considerar startDate válido solo si es un número (timestamp)
    if (typeof startDate === "number" && !isNaN(startDate)) {
      eventDate = new Date(startDate);
    } else {
      eventDate = null; // Fecha inválida
    }

    // Incrementar total de cuentas
    totalAccounts++;

    // Contar suscripciones canceladas según la definición
    if (!state && eventDate) {
      canceledSubscriptions++;
    }

    // Contar suscripciones activas
    if (state) {
      activeSubscriptions++;
    }

    // Contar suscripciones activas en el mes anterior
    if (state) {
      if (eventDate && eventDate <= previousMonthEnd) {
        // La suscripción estaba activa en el mes anterior
        previousMonthActive++;
      } else if (!eventDate) {
        // Si no tiene startDate válido, asumimos que estuvo activa en el mes anterior
        previousMonthActive++;
      }
      // Si eventDate es después del mes anterior, no se cuenta en el mes anterior
    }
  });

  // Restar 7 al total de suscripciones activas para excluir las cuentas no reales
  activeSubscriptions = Math.max(0, activeSubscriptions - 7);
  previousMonthActive = Math.max(0, previousMonthActive - 7);

  // Calcular porcentaje de crecimiento
  let growthPercentage = 0;
  if (previousMonthActive > 0) {
    growthPercentage =
      ((activeSubscriptions - previousMonthActive) / previousMonthActive) * 100;
  } else if (activeSubscriptions > 0) {
    // Si no había suscripciones activas el mes anterior pero ahora sí
    growthPercentage = 100;
  } else {
    // Si no hay suscripciones activas ahora ni antes
    growthPercentage = 0;
  }

  // Formatear el porcentaje con dos decimales
  const formattedGrowthPercentage = growthPercentage.toFixed(2) + "%";

  // Determinar el tipo de cambio para mostrar en el UI
  const changeType =
    growthPercentage > 0
      ? "positive"
      : growthPercentage < 0
      ? "negative"
      : "neutral";
  const changeSymbol =
    growthPercentage > 0 ? "↑" : growthPercentage < 0 ? "↓" : "";

  // Construir el array de datos para el componente
  const data = [
    {
      name: "Suscripciones activas",
      stat: activeSubscriptions,
      change: `${changeSymbol} ${formattedGrowthPercentage}`,
      changeType: changeType,
    },
    {
      name: "Suscripciones canceladas",
      stat: canceledSubscriptions,
      change: "",
      changeType: "negative",
    },
    {
      name: "Cuentas totales",
      stat: totalAccounts,
      change: "",
      changeType: "positive",
    },
  ];

  return data;
}
// Atencion utils
function getAtencionesThisMonth(data) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Months are zero-based in JavaScript Date objects

  // Find the entry that matches the current year and month
  const entry = data.find(
    (item) => item.year === currentYear && item.month === currentMonth
  );

  // Return the 'atenciones' value if found, otherwise return 0
  return entry ? entry.atenciones : 0;
}
// Citys
function transformarOrganizaciones(orgs) {
  // Crear un objeto para contar el número de organizaciones por departamento
  const conteoDepartamentos = {};

  orgs.forEach((item) => {
    const org = item.org;
    let departamento = org.org_departament || "Desconocido";

    // Estandarizar el nombre del departamento:
    // Eliminar espacios y tildes, y capitalizar la primera letra
    departamento = departamento
      .normalize("NFD") // Normaliza para separar caracteres diacríticos
      .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos (tildes)
      .replace(/\s+/g, "") // Elimina espacios
      .toLowerCase();

    // Capitalizar la primera letra
    if (departamento.length > 0) {
      departamento =
        departamento.charAt(0).toUpperCase() + departamento.slice(1);
    }

    if (conteoDepartamentos[departamento]) {
      conteoDepartamentos[departamento]++;
    } else {
      conteoDepartamentos[departamento] = 1;
    }
  });

  // Transformar el objeto en un arreglo con propiedades name y amount
  const resultado = Object.keys(conteoDepartamentos).map((departamento) => ({
    name: departamento,
    value: conteoDepartamentos[departamento],
  }));

  return resultado;
}
// Total attetions
function calculateTotalAtencionesPerMonth(usersData) {
  // 1. Define the date range (last 10 months)
  const monthsArray = [];
  const now = new Date();
  const earliestDateInPeriod = new Date(
    now.getFullYear(),
    now.getMonth() - 9,
    1
  );

  for (let i = 9; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthsArray.push(date);
  }

  // 2. Aggregate 'atenciones' per month from all users
  const atencionesPerMonth = {};

  usersData.forEach((user) => {
    user.stats?.forEach((stat) => {
      const year = stat.year;
      const month = stat.month;
      const atenciones = stat.atenciones;

      // Create a unique key for each month
      const dateKey = new Date(year, month, 1).getTime();

      if (!atencionesPerMonth[dateKey]) {
        atencionesPerMonth[dateKey] = 0;
      }
      atencionesPerMonth[dateKey] += atenciones;
    });
  });

  // 3. Build the result array
  const result = monthsArray.map((monthDate) => {
    const dateKey = monthDate.getTime();
    const atenciones = atencionesPerMonth[dateKey] || 0;

    const monthName = monthDate.toLocaleString("es-ES", { month: "short" });
    const year = monthDate.getFullYear().toString().slice(-2);

    return {
      date: `${monthName} ${year}`,
      totalAtenciones: atenciones,
    };
  });

  return result;
}

export default function Admin() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editValue, setEditValue] = useState({});
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [activeSubsPerMonth, setActiveSubsPerMonth] = useState([]);
  const [kpiData, setKpiData] = useState([]);
  const [citysData, setCitysData] = useState([]);
  const [totalAtencionesPerMonth, setTotalAtencionesPerMonth] = useState([]);
  // Agrega atributos adicionales a los perfiles de usuario
  const enrichUserData = (usersData) => {
    return usersData.map((user) => {
      const adminProfile = user.profiles.find(
        (profile) => profile.profile_type === "doctor-admin"
      );
      const orgName = user.org?.org_name || "-";
      const identificationType = user.billinding?.identificationType || "";
      const identificationNumber = user.billinding?.identificationNumber || "-";
      const idNumber = `${identificationType} : ${identificationNumber}`;

      return {
        ...user,
        adminName: `${adminProfile?.profile_name || ""} ${
          adminProfile?.profile_lastname || ""
        }`,
        adminEmail: adminProfile?.profile_mail || "-",
        adminPhone: adminProfile?.profile_phone || "-",
        subscriptionStatus: user.billinding?.state ? "Activada" : "Desactivada",
        orgName,
        currentMonthAttetions: user.stats
          ? getAtencionesThisMonth(user.stats)
          : 0,
        patientsCount: user.pacientes ? Number(user.pacientes) : 0,
        appointmentsCount: user.citas ? Number(user.citas) : 0,
        paymentsCount: user.pagos ? Number(user.pagos) : 0,
        startDate: formatDate(user.billinding?.startDate),
        idNumber,
      };
    });
  };

  // Obtiene los datos de usuarios desde Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const result = await getDocs(collection(db, "organizations"));
      const usersData = result.docs.map((doc) => doc.data());
      setData(usersData);
      setUsers(enrichUserData(usersData));
      setSpecialty(
        transformSpecialtyData(usersData).filter(
          (item) => item.name !== "no registra"
        )
      );
      setActiveSubsPerMonth(generateActiveSubsPerMonth(usersData));
      setKpiData(generateKPIs(usersData));
      setCitysData(
        transformarOrganizaciones(usersData).filter(
          (item) => item.name !== "Desconocido"
        )
      );
      setTotalAtencionesPerMonth(calculateTotalAtencionesPerMonth(usersData));
    };
    fetchUsers();
  }, []);

  return (
    <div className="h-screen p-4 overflow-y-auto bg-gray-100">
      <h1 className="mb-4 text-2xl font-semibold dark:text-dark-tremor-default">
        Dashboard
      </h1>

      <dl className="grid grid-cols-1 gap-6 mb-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((item) => (
          <Card key={item.name}>
            <dt className="font-medium text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {item.name}
            </dt>
            <dd className="mt-2 flex items-baseline space-x-2.5">
              <span className="font-semibold text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.stat}
              </span>
              <span
                className={classNames(
                  item.changeType === "positive"
                    ? "text-emerald-700 dark:text-emerald-500"
                    : "text-red-700 dark:text-red-500",
                  "text-tremor-default font-medium"
                )}
              >
                {item.change}
              </span>
            </dd>
          </Card>
        ))}
      </dl>

      <Card className="mb-4">
        <div className="flex">
          <h1 className="mb-4">Suscripciones activas por mes</h1>
          <ExportarExcel data={activeSubsPerMonth} />
        </div>
        <LineChart
          className="h-80"
          data={activeSubsPerMonth}
          index="date"
          yAxisWidth={65}
          categories={["activeSubs"]}
          colors={["green"]}
          xAxisLabel="Mes del año"
          yAxisLabel="N° de Subs activas"
          tickGap={0}
        />
      </Card>

      <div className="grid grid-cols-1 gap-2 my-4 md:grid-cols-2">
        <Card className="overflow-y-auto h-80">
          <div className="flex">
            <h1 className="mb-4">Especialidades</h1>
            <ExportarExcel data={specialty} />
          </div>
          <BarList data={specialty} className="w-full" />
        </Card>

        <Card>
          <div className="flex">
            <h1 className="mb-4">Ciudades</h1>
            <ExportarExcel data={citysData} />
          </div>
          <div className="flex items-center justify-center space-x-6">
            <DonutChart
              data={citysData}
              variant="pie"
              index="name"
              // valueFormatter={valueFormatter}
              colors={generateColorPalette(citysData.length)}
              className="w-40"
            />
            <Legend
              categories={citysData.map((data) => data.name)}
              colors={generateColorPalette(citysData.length)}
              className="max-w-xs"
            />
          </div>
        </Card>
      </div>
      <div>
        <Table
          headers={[
            { key: "adminName", label: "CLIENTE", type: "string" },
            { key: "adminEmail", label: "E-MAIL", type: "string" },
            { key: "adminPhone", label: "CELULAR", type: "string" },
            { key: "idNumber", label: "TIPO Y N° DOC", type: "string" },
            {
              key: "subscriptionStatus",
              label: "SUSCRIPCIÓN",
              type: "multipleSelect",
              options: [
                {
                  label: "Activada",
                  value: "Activada",
                  color: "bg-green-100 text-green-800",
                },
                {
                  label: "Desactivada",
                  value: "Desactivada",
                  color: "bg-red-100 text-red-800",
                },
              ],
            },
            { key: "startDate", label: "INICIO", type: "date" },
            // { key: "patientsCount", label: "N° PACIENTES", type: "string" },
            {
              key: "currentMonthAttetions",
              label: "ATENCIONES MA",
              type: "numberRange",
            },
            {
              key: "appointmentsCount",
              label: "N° CITAS",
              type: "numberRange",
            },
            { key: "paymentsCount", label: "N° PAGOS", type: "numberRange" },
          ]}
          initialFilters={[
            {
              key: "subscriptionStatus",
              value: ["Activada"],
            },
          ]}
          initialSortConfig={[
            { key: "currentMonthAttetions", direction: "ascending" },
          ]}
          data={users}
          action={(row) => {
            setEditValue(row);
            setIsEditModalVisible(true);
          }}
          title={"Usuarios"}
          itemsPerPage={20}
        />
        {isEditModalVisible && (
          <User
            editValue={editValue}
            setIsEditModalVisible={setIsEditModalVisible}
          />
        )}
      </div>
      <Card className="my-4">
        <div className="flex">
          <h1 className="mb-4">Atenciones por mes</h1>
          <ExportarExcel data={totalAtencionesPerMonth} />
        </div>
        <BarChart
          className="h-80"
          data={totalAtencionesPerMonth}
          index="date"
          yAxisWidth={65}
          categories={["totalAtenciones"]}
          colors={["green"]}
          xAxisLabel="Mes del año"
          yAxisLabel="N° de Atenciones"
          tickGap={0}
        />
      </Card>
    </div>
  );
}

// falta dashboard de Tipos de plan en frecuencia
// falta dashboard de numero de cuentas
// falta dashboard de cancelacion

// falta dashboard de fecha de creacion
// poner fechas de creacion para medir nuevos y contadores mejorados por modulo y fecatures kpis

// probar filtro de fecha...
