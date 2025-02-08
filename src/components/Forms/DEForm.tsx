import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: Record<string, any>;
};
type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;
const DEForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: TFormProps) => {
  const fromConfig: TFormConfig = {};
  if (resolver) {
    fromConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    fromConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(fromConfig);
  const submit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    onSubmit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default DEForm;
