import axios from "axios";
import React, { useContext, useState } from "react";
// import { serverLink } from "../main";
import toast from "react-hot-toast";
import { AppContext } from "../components/AppContextProvider";
import { Navigate, Link as ReactRouterLink } from "react-router-dom";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setIsAuth, isAuth, loading, setIsLoading } = useContext(AppContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const API_URL = `${process.env.REACT_APP_API_URL}/signup`  
      console.log("API_URL",API_URL,process.env)
      const response = await axios.post(API_URL, {
        user: {
          name,
          email,
          password,
          company_name: company,
        },
      });
      setIsAuth(true);
      toast.success("Signed up successfully.");
      setName("");
      setEmail("");
      setPassword("");
      setCompany("");
      setIsLoading(false);
    } catch (error) {

      setIsAuth(false);
      toast.error(error.response.data.status.message || "Something went wrong.");
      setIsLoading(false);
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to make your time productive ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={bgColor}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="company" isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                // isDisabled={loading ? true : false}
                onClick={handleForm}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <ReactRouterLink color={"blue.400"} to="/login">
                  Login
                </ReactRouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
