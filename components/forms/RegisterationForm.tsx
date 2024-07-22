"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitBtn from "../SubmitBtn";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUpload from "../FileUpload";

const RegistrationForm =  ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

   const onSubmit = async (data: z.infer<typeof UserFormValidation>) => {
     setIsLoading(true);
     try {
       const user = await createUser(data);
       if (user) router.push(`/patients/${user.$id}/register`);
     } catch (error) {
       console.error(error);
     } finally {
       setIsLoading(false);
     }
   };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Would love to more about you</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            label="Full Name"
            name="name"
            placeholder="Kwame Cody"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="kwamecody@js.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="+1 234 567 890"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of Birth"
              placeholder="17th May 2000"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer item-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name} </p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flw-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="Enterprise Insurance"
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="EC-123-809"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flw-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies(if any)"
              placeholder="Doughnuts"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedications"
              label="Current Medications(if any)"
              placeholder="Aspirin"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flw-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family Medical History(if any)"
              placeholder="Mother had Cancer"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History(if any)"
              placeholder="Hypertension"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification Verication</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select a type"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="GHA-0980-98"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUpload files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment"/>
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information"
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy"
          />
        </section>

        <SubmitBtn isLoading={isLoading} className={"shad-primary-btn w-full"}>
          Get Started
        </SubmitBtn>
      </form>
    </Form>
  );
};

export default RegistrationForm;
