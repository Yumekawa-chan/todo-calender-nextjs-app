import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import {useAuth,useUser} from "../hooks/firebase";
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
    confirmationPassword:string;
}

export default function Signup(){
    const {
        register,
        handleSubmit,
        formState:{ errors },
    } = useForm<Inputs>();

    const auth = useAuth();
    const currentUser = useUser();
    const [isProcessingSignup,setIsProcessingSignup] = useState(false);
    const router = useRouter();
    const signup = async(email:string,password:string) => {
        try{
            setIsProcessingSignup(true)
            await createUserWithEmailAndPassword(auth,email,password);
            setIsProcessingSignup(false);
        }catch(e){
            console.log(e);
        }
    }

    const onSubmit:SubmitHandler<Inputs> = ({
        email,
        password,
        confirmationPassword
    }) => {
        if(password === confirmationPassword){
            signup(email,password);
        } else {
            alert("Password does not match.");
        }
    };

    useEffect(()=>{
        if(currentUser) router.push("/mypage");
        },[currentUser,router]);

    return(
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
              <FormLabel fontWeight="bold">Email</FormLabel>
              {errors.email && (
                <Text color="red.400" mb="8px">
                  Email is required.
                </Text>
              )}
              <Input
                type="email"
                size="lg"
                mb="8"
                placeholder="example@test.com"
                {...register("email", { required: true })}
              />
              <FormLabel fontWeight="bold">Password</FormLabel>
              {errors.password && (
                <Text color="red.400" mb="8px">
                  Password is required.
                </Text>
              )}
              <Input
                type="password"
                {...register("password", { required: true })}
                size="lg"
                mb="8"
              />
              <FormLabel fontWeight="bold">Retype password</FormLabel>
              {errors.confirmationPassword && (
                <Text color="red.400" mb="8px">
                  Retype password is required.
                </Text>
              )}
              <Input
                type="password"
                {...register("confirmationPassword", { required: true })}
                size="lg"
                mb="8"
              />

              <Flex flexDirection="column">
                <Text mb="8" textAlign="center">
                Already have an account? 
                  <Link href="/signin">here.</Link>
                </Text>
                <Button
                  type="submit"
                  color="white"
                  background="gray.800"
                  size="lg"
                  paddingX="80px"
                  m="0 auto"
                  isLoading={isProcessingSignup}
                  _hover={{
                    background: "gray.700",
                  }}
                >
                  Signup
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
    );
}
