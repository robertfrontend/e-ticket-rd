"use client";

import { Mail } from "lucide-react";
import React, { useCallback } from "react";
import { useFormStatus } from "react-dom";
import { isValidPhoneNumber } from "react-phone-number-input";

import { FormField } from "@/components/forms/form-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";
import { validateEmail } from "@/lib/schemas/validation";

import type { AppFormApi, FormStepId } from "@/lib/types/form-api";
import type { AnyFieldApi } from "@tanstack/react-form";

// Component interface with proper typing
interface ContactInfoStepProps {
  form: AppFormApi;
  onNext?: () => void;
  onPrevious?: () => void;
  stepId?: FormStepId;
}

// Enhanced phone field component with consistent patterns
function PhoneField({ field }: { field: AnyFieldApi }) {
  const { pending: formPending } = useFormStatus();

  const handlePhoneChange = useCallback(
    (value: string | undefined) => {
      field.handleChange(value || "");
    },
    [field]
  );

  const handlePhoneBlur = useCallback(() => {
    field.handleBlur();
  }, [field]);

  return (
    <FormField
      field={field}
      label="Phone Number"
      required
      description="Enter a phone number with country code for travel notifications"
      disabled={formPending}
    >
      <PhoneInput
        international
        defaultCountry="DO"
        value={field.state.value || undefined}
        onChange={handlePhoneChange}
        onBlur={handlePhoneBlur}
        disabled={formPending}
        className="w-full max-w-sm"
        autoComplete="tel"
      />
    </FormField>
  );
}

export function ContactInfoStep({ form }: ContactInfoStepProps) {
  return (
    <div className="space-y-6">
      {/* Contact Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Address */}
          <form.AppField
            name="contactInfo.email"
            validators={{
              onBlur: ({ value }: { value: string }) => {
                if (!value || !value.trim()) {
                  return "Email is required for e-ticket delivery";
                }
                const result = validateEmail.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0]?.message;
              },
            }}
          >
            {(field: AnyFieldApi) => (
              <FormField
                field={field}
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                required
                description="We'll send your e-ticket confirmation to this email address"
                inputMode="email"
                autoComplete="email"
              />
            )}
          </form.AppField>

          {/* Phone Number */}
          <form.AppField
            name="contactInfo.phone"
            validators={{
              onBlur: ({ value }: { value: string }) => {
                if (!value || value.trim() === "") {
                  return "Phone number is required for travel notifications";
                }
                return isValidPhoneNumber(value)
                  ? undefined
                  : "Please enter a valid phone number";
              },
            }}
          >
            {(field: AnyFieldApi) => <PhoneField field={field} />}
          </form.AppField>
        </CardContent>
      </Card>
    </div>
  );
}
