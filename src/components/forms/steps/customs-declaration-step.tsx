"use client";

import {
  Shield,
  DollarSign,
  Leaf,
  Package,
  InfoIcon,
  CheckCircle,
  AlertTriangle,
  FileCheck,
} from "lucide-react";
import React from "react";

import { BooleanRadioGroup } from "@/components/forms/form-radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  validateCarriesOverTenThousand,
  validateCarriesAnimalsOrFood,
  validateCarriesTaxableGoods,
} from "@/lib/schemas/validation";

import type { FormStepProps } from "@/lib/types/form-api";
import type { AnyFieldApi } from "@tanstack/react-form";

// Constants for icon colors to avoid duplication
const ICON_COLORS = {
  GREEN: "text-green-600",
  YELLOW: "text-yellow-600",
  ORANGE: "text-orange-600",
  RED: "text-red-600",
} as const;

interface CustomsDeclarationStepProps extends FormStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

export function CustomsDeclarationStep({
  form,
  stepId = "customs-declaration",
}: CustomsDeclarationStepProps) {
  return (
    <div className="space-y-6">
      {/* Money Declaration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Money and Monetary Instruments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form.AppField
            name="customsDeclaration.carriesOverTenThousand"
            validators={{
              onChange: ({ value }: { value: boolean }) => {
                if (value === null || value === undefined) {
                  return "Please select if you're carrying over $10,000";
                }
                const result = validateCarriesOverTenThousand.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0]?.message;
              },
            }}
          >
            {(field: AnyFieldApi) => (
              <BooleanRadioGroup
                field={field}
                stepId={stepId}
                options={[
                  {
                    value: false,
                    label: "No",
                    description: "Less than US$10,000",
                    icon: <Shield className="h-5 w-5" />,
                    iconColor: ICON_COLORS.GREEN,
                  },
                  {
                    value: true,
                    label: "Yes",
                    description: "US$10,000 or more",
                    icon: <DollarSign className="h-5 w-5" />,
                    iconColor: ICON_COLORS.YELLOW,
                  },
                ]}
                layout="grid"
                columns="2"
                padding="small"
                size="small"
                description="Includes cash, traveler's checks, and money orders"
              />
            )}
          </form.AppField>
        </CardContent>
      </Card>

      {/* Prohibited Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Biological Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form.AppField
            name="customsDeclaration.carriesAnimalsOrFood"
            validators={{
              onChange: ({ value }: { value: boolean }) => {
                if (value === null || value === undefined) {
                  return "Please select if you're carrying biological materials";
                }
                const result = validateCarriesAnimalsOrFood.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0]?.message;
              },
            }}
          >
            {(field: AnyFieldApi) => (
              <BooleanRadioGroup
                field={field}
                stepId={stepId}
                options={[
                  {
                    value: false,
                    label: "No",
                    description: "No biological materials",
                    icon: <Shield className="h-5 w-5" />,
                    iconColor: ICON_COLORS.GREEN,
                  },
                  {
                    value: true,
                    label: "Yes",
                    description: "Carrying biological items",
                    icon: <Leaf className="h-5 w-5" />,
                    iconColor: ICON_COLORS.ORANGE,
                  },
                ]}
                layout="grid"
                columns="2"
                padding="small"
                size="small"
                description="Includes food, plants, animals, and soil"
              />
            )}
          </form.AppField>
        </CardContent>
      </Card>

      {/* Taxable Goods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Taxable Goods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form.AppField
            name="customsDeclaration.carriesTaxableGoods"
            validators={{
              onChange: ({ value }: { value: boolean }) => {
                if (value === null || value === undefined) {
                  return "Please select if you're carrying taxable goods";
                }
                const result = validateCarriesTaxableGoods.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0]?.message;
              },
            }}
          >
            {(field: AnyFieldApi) => (
              <BooleanRadioGroup
                field={field}
                stepId={stepId}
                options={[
                  {
                    value: false,
                    label: "No",
                    description: "Personal items only",
                    icon: <Shield className="h-5 w-5" />,
                    iconColor: ICON_COLORS.GREEN,
                  },
                  {
                    value: true,
                    label: "Yes",
                    description: "Commercial or taxable goods",
                    icon: <Package className="h-5 w-5" />,
                    iconColor: ICON_COLORS.RED,
                  },
                ]}
                layout="grid"
                columns="2"
                padding="small"
                size="small"
                description="Includes commercial items and gifts over duty-free limits"
              />
            )}
          </form.AppField>
        </CardContent>
      </Card>

      {/* Legal Information and Requirements */}
      <div className="space-y-4">
        {/* Allowance Information */}
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Customs Allowance</AlertTitle>
          <AlertDescription>
            Passengers may bring or carry goods or gift items worth up to USD
            $500.00 (five hundred dollars). This allowance may only be used once
            every three (3) months.
          </AlertDescription>
        </Alert>

        {/* Mandatory Declaration */}
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Mandatory Declaration</AlertTitle>
          <AlertDescription>
            The presentation of this declaration is mandatory for all passengers
            who leave or enter the Dominican Republic. For minors, this form
            must be completed and signed by the responsible adult.
          </AlertDescription>
        </Alert>

        {/* Legal Consequences Warning */}
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Legal Warning</AlertTitle>
          <AlertDescription>
            False or incomplete declaration of information may result in
            penalties such as seizure of goods and deprivation of freedom,
            according to Article 200 of Law 3489 of the Customs Regime, and
            Article 4 of Law No. 155-17 against Money Laundering.
          </AlertDescription>
        </Alert>

        {/* Signature Requirement */}
        <Alert>
          <FileCheck className="h-4 w-4" />
          <AlertTitle>Signature Required</AlertTitle>
          <AlertDescription>
            This declaration must be signed by the passenger where indicated.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
