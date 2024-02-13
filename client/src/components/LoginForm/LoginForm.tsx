import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import {FC} from "react";
import {useMutation} from "@tanstack/react-query";
import {loginUser} from "../../api/User";
import {queryClient} from "../../api/queryClient";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const LoginSchema = z.object({
    email: z.string().email('Email должен содержать корректный формат электронной почты'),
    password: z.string().min(8, 'Пароль должен содержать не менее восьми символов'),
});
type LoginForm = z.infer<typeof LoginSchema>;

export const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, reset} = useForm<LoginForm>({
        resolver: zodResolver(LoginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    }, queryClient);

  return (
    <form className="login-form" onSubmit={handleSubmit((user) => {
        loginMutation.mutate(user);
        reset();
    })}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input {...register("password")} type="password" />
      </FormField>
      {loginMutation.error && <span>{loginMutation.error.message}</span>}
      <Button type="submit" isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
