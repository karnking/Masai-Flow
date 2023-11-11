import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from "./FireBase";
import { addUser } from "../redux/userReducer/action";
import { useDispatch } from "react-redux";

const Signup = ({ onClose, onOpen }) => {

  const dispatch=useDispatch()
  const toast=useToast()

  const [user, setUser] = useState({
    username:"",
    email:"",
    password:""
  });

  const [googlesignup,setGooglesignup]=useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    setGooglesignup(true);
    // dispatch(setLOGIN(result.user))
    console.log(result.user)
    // toast({
    //   title: 'Logged in successfully.',
    //   // description: "We've created your account for you.",
    //   status: 'success',
    //   duration: 3000,
    //   isClosable: true,
    // })
    onClose()
  }


  const handleChange=(e)=>{
    e.preventDefault();
    setUser({...user,[e.target.name]:e.target.value})
  }
  console.log(user)

  const handleSubmit=async()=>{
    const {username,email,password}=user
     if(username==""){
        toast({
      title: 'User name can not be left.',
      // description: "We've created your account for you.",
      status: 'error',

      duration: 3000,
      isClosable: true,
    })
    return
     }

     if(email==""){
      toast({
    title: 'email can not be left.',
    // description: "We've created your account for you.",
    status: 'error',
    duration: 3000,
    isClosable: true,
  })
      return
   }

   
   if(!googlesignup&&password==""){
    toast({
  title: 'password can not be left.',
  // description: "We've created your account for you.",
  status: 'error',
  duration: 3000,
  isClosable: true,
})

return;
 }

 dispatch(addUser(user))


  }


  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px" className="text-center h-[100px] font-bold">
          <Text className="font-bold text-[25px]">
            Signup
          </Text>
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px" className="items-center mt-10">
            <Box>
              <FormLabel htmlFor="username">Name:</FormLabel>
              <Input
                width={"350px"}
                size={"lg"}
                id="name"
                name="username"
                value={user.username}
                placeholder="Please enter username"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                width={"350px"}
                size={"lg"}
                type="email"
                id="emailid"
                name="email"
                value={user.email}
                placeholder="Please enter user email id"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="password">Password:</FormLabel>
              <Input
                width={"350px"}
                size={"lg"}
                type="password"
                id="password"
                name="password"
                value={user.password}
                placeholder="Please enter user password"
                onChange={handleChange}
              />
            </Box>

          <Button className="w-[77%] " colorScheme="red" size={"lg"} onClick={handleSubmit}>Submit</Button>

            <div className="mt-5 flex justify-center gap-2">
              <FcGoogle onClick={handleGoogleLogin} className="w-24 h-[35px] -ml-12 cursor-pointer" />
              <Center height="40px" className="pr-7">
                <Divider orientation="vertical" borderColor={"black"} />
              </Center>
              <Button className="" variant={"outline"} onClick={()=>{onClose(); onOpen();}} colorScheme={"blue"}>
                Login{" "}
              </Button>
            </div>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default Signup;
