import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Radio, DatePicker, Button } from "antd";

const RegistrationForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    console.log("Успешно зарегистрировано");
    reset();
  };
  const watchPassWord = watch("password");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Имя:</label>
        <Controller
          name="text"
          control={control}
          rules={{ required: "Поле обязательно для заполнения" }}
          render={({ field }) => <Input {...field} placeholder="Введите имя" />}
        />
        <p>{errors.text?.message}</p>
      </div>

      <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Поле обязательно для заполнения",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "Введите корректный email",
            },
          }}
          render={({ field }) => <Input {...field} placeholder="Email" />}
        />
        <p>{errors.email?.message}</p>
      </div>

      <div>
        <label>Пароль:</label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 6,
              message:
                "Пароль должен быть не меньше 6 символов и содержать хотя бы одну заглавную букву",
            },
            // validate: { upperLetter: let => let.split('').
            //   value:  ,
            //   message: "Пароль должен содержать хотя бы одну заглавную букву",
            // },
          }}
          render={({ field }) => (
            <Input {...field} placeholder="Введите пароль" />
          )}
        />
        <p>{errors.password?.message}</p>
      </div>

      <div>
        <label>Подтвердите пароль:</label>
        <Controller
          name="confirm-password"
          control={control}
          rules={{
            required: "Поле обязательно для заполнения",
            validate: (val) => {
              if (watchPassWord !== val) {
                return "Пароли не совпадают";
              }
              // {value.split("").map((item) => item === item.toUpperCase()) ||
              // "Пароль должен содержать хотя бы одну заглавную букву"}
            },
            minLength: {
              value: 6,
              message:
                "Пароль должен быть не меньше 6 символов и содержать хотя бы одну заглавную букву",
            },
          }}
          render={({ field }) => (
            <Input {...field} placeholder="Подтвердите пароль" />
          )}
        />
        <p>{errors.password?.message}</p>
      </div>

      <div>
        <label>Дата рождения:</label>
        <Controller
          name="date"
          control={control}
          rules={{
            required: "Выберите дату",
          }}
          render={({ field }) => (
            <DatePicker {...field} placeholder="Введите дату рождения" />
          )}
        />
        <p>{errors.date?.message}</p>
      </div>

      <div>
        <label>Пол:</label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Выберите пол" }}
          render={({ field }) => (
            <Radio.Group {...field}>
              <Radio value="male">Мужской</Radio>
              <Radio value="female">Женский</Radio>
            </Radio.Group>
          )}
        />
        <p>{errors.gender?.message}</p>
      </div>

      <div>
        <label>Номер телефона:</label>
        <Controller
          defaultValue={"+375"}
          name="phone"
          control={control}
          rules={{
            required: "Введите номер телефона",
            minLength: {
              value: 13,
              message: "Некорректно введён номер телефона",
            },
            maxLength: {
              value: 13,
              message: "Некорректно введён номер телефона",
            },
            // validate: (value) =>
            //   value === Number.isFinite(value.slice(4)) ||
            //   "Некорректно введён номер телефона",
          }}
          render={({ field }) => <Input {...field} />}
        />
        <p>{errors.phone?.message}</p>
      </div>

      <Button type="primary" htmlType="submit" disabled={!isValid}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegistrationForm;
