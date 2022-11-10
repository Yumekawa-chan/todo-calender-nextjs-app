import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "../hooks/firebase";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

type Inputs = {
  email:string;
  password:string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState:{ errors },
  } = useForm<Inputs>();

  const auth = getAuth();
  const currentUser = useUser();
  const router = useRouter();

  const doLogin = (email:string,password:string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log( user );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
  const onSubmit:SubmitHandler<Inputs> = ({
    email,
    password,
  }) => {
    doLogin(email,password);
  };

  useEffect(()=>{
    if(currentUser) router.push("/mypage");
  },[currentUser,router]);


  return (
    <Flex>
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading color="gray.800" mb="48px" textAlign="center" size="xl">
          TODO CALENDER
        </Heading>
        <Box
          boxShadow="lg"
          w="600px"
          paddingY="120px"
          paddingX="32px"
          borderRadius="8px"
          border="1px solid"
          borderColor="gray.100"
          m="0 auto"
          display="flex"
        >
          <Box w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel fontWeight="bold">メールアドレス</FormLabel>
              {errors.email && (
                <Text color="red.400" mb="8px">
                  メールアドレスは必須です
                </Text>
              )}
              <Input
                type="email"
                size="lg"
                mb="8"
                placeholder="example@test.com"
                {...register("email", { required: true })}
              />
              <FormLabel fontWeight="bold">パスワード</FormLabel>
              {errors.password && (
                <Text color="red.400" mb="8px">
                  パスワードは必須です
                </Text>
              )}
              <Input
                type="password"
                {...register("password", { required: true })}
                size="lg"
                mb="8"
              />
              <Flex flexDirection="column">
                <Text mb="8" textAlign="center">
                  アカウントの新規作成
                  <Link href="/signup">こちら</Link>
                </Text>
                <Button
                  type="submit"
                  color="white"
                  background="gray.800"
                  size="lg"
                  paddingX="80px"
                  m="0 auto"
                  onClick = {doLogin}
                  _hover={{
                    background: "gray.700",
                  }}
                >
                  ログイン
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}