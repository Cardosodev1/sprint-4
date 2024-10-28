'use client'

import Button from "@/components/Button/index";
import Input from "@/components/Input/index";
import { useForm, SubmitHandler, Controller, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState, useEffect, useMemo } from 'react';
import * as yup from "yup";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
}).required();

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const { errors, isValid } = useMemo(() => formState, [formState]);

  async function submitErrorCallback() {
    // TODO: Tratar erros
  }

  async function submitCallback(values: RegisterFormData) {
    setLoading(true);

    if (!isValid) {
      await submitErrorCallback();
      setLoading(false);
      return;
    }

    // TODO: Envie os dados do formulário para a API
    console.log(values);

    // Simula uma requisição à API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  }

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit(submitCallback)}
      ref={formRef}
      noValidate
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label='Nome'
            type='text'
            id='name'
            placeholder='Nome completo'
            readOnly={loading}
            customError={errors?.name?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label='E-mail'
            type='email'
            id='email'
            placeholder='E-mail'
            readOnly={loading}
            customError={errors?.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            label='Senha'
            type='password'
            id='password'
            placeholder='Senha'
            minLength={6}
            readOnly={loading}
            customError={errors?.password?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
            label='Confirmar Senha'
            type='password'
            id='confirmPassword'
            placeholder='Confirme a senha'
            minLength={6}
            readOnly={loading}
            customError={errors?.confirmPassword?.message}
            {...field}
          />
        )}
      />
      <Button type='submit' disabled={!formRef.current || loading || !isValid}>
        {
          loading
            ? 'Carregando...'
            : 'Registrar'
        }
      </Button>
    </form>
  )
}