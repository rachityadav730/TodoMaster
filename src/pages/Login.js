import axios from "axios";
import React, { useContext, useState } from "react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { AppContext } from "../components/AppContextProvider";
import { toast } from "react-hot-toast";
// import { serverLink } from "../main";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth, isAuth, setIsLoading, loading, setUserName } =
    useContext(AppContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {

      // const API_URL = `${process.env.REACT_APP_API_URL}/login`
      const API_URL = `${process.env.REACT_APP_API_URL}/login`  
      const user = {
        email,
        password,
      };
        const response = await axios.post(API_URL, { user }, { headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
      }});
        if (response.data && response.data.status && response.data.status.data.user){
            let user = response.data.status.data.user
            const headers = response.headers;
            const contentType = headers['content-type'];
            const authorization = headers['authorization'];
            localStorage.setItem("actualtoken", authorization);
            localStorage.setItem("all_users", JSON.stringify(response.data.status.data.all_users));
            // localStorage.setItem("token",response.data.status.token );
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("contentType", contentType);
            toast.success(response.data.message);
            setUserName(response.data.message);
            setIsAuth(true);
            setEmail("");
            setPassword("");
            setIsLoading(false);
        }
       
    } catch (error) {
      toast.error("Invalid Email or password.");
      setIsLoading(false);
      setIsAuth(false);
    }
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");

  if (isAuth) return <Navigate to="/" />;

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={bgColor}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to add your task ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={bgColor}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="current-password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                // isDisabled={loading ? true : false}
                onClick={handleForm}
              >
                Sign in
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={"center"}>
                New here?{" "}
                <ReactRouterLink color={"blue.400"} to="/register">
                  Register
                </ReactRouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
