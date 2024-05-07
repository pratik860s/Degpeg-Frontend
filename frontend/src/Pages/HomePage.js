import React, { useState } from 'react';
import {
  Container,
  Box,
  Input,
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  useToast,
  extendTheme,
  ChakraProvider
} from '@chakra-ui/react';

// Extend the theme to include custom colors, fonts, etc.
const theme = extendTheme({
  colors: {
    brand: {
      100: '#ffeb3b', // Yellow background
      200: '#f44336', // Red button
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'gray.300',
            _hover: {
              borderColor: 'gray.400',
            },
          },
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
  },
});

const HomePage = () => {
  const [level, setLevel] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [gst, setGst] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const toast = useToast();

  const handleNextLevel = () => {
    // Validation for Level 1 fields
    if (level === 1 && (!name || !email || !mobile || !location)) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields before proceeding.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validation for Level 2 fields
    if (level === 2 && !gst) {
      toast({
        title: 'Error',
        description: 'Please provide your GST number before proceeding.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validation for Level 3 fields
    if (level === 3 && (!accountNumber || !ifsc)) {
      toast({
        title: 'Error',
        description: 'Please provide your bank details before submitting.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Proceed to the next level or submit the form
    if (level < 3) {
      setLevel((prevLevel) => prevLevel + 1);
    } else {
      // Submit the form data
      // TODO: Add form submission logic here
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Container centerContent bg="brand.100" minH="100vh">
        <Box bg="white" w={['90%', '80%', '70%']} p={8} borderRadius="lg" borderWidth="1px" boxShadow="md">
          <VStack spacing={4}>
          {level === 1 && (
            <>
              <Heading size="md">Expert Registration - Level 1</Heading>
              <FormControl isRequired>
                <FormLabel>Business/Expert Name</FormLabel>
                <Input placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email for OTP Verification</FormLabel>
                <Input placeholder="Enter email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Mobile No. for OTP Verification</FormLabel>
                <Input placeholder="Enter mobile number" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Business/Expert Location</FormLabel>
                <Input placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </FormControl>
            </>
          )}
          {level === 2 && (
            <>
              <Heading size="md">Expert Verification - Level 2</Heading>
              <FormControl isRequired>
                <FormLabel>Business/Expert GST</FormLabel>
                <Input placeholder="Enter GST number" value={gst} onChange={(e) => setGst(e.target.value)} />
              </FormControl>
              {/* Add validation for file inputs as needed */}
            </>
          )}
          {level === 3 && (
            <>
              <Heading size="md">Payment Details - Level 3</Heading>
              <FormControl isRequired>
                <FormLabel>Bank/Branch Name</FormLabel>
                <Input placeholder="Enter bank/branch name" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Account No.</FormLabel>
                <Input placeholder="Enter account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>IFSC Code</FormLabel>
                <Input placeholder="Enter IFSC code" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
              </FormControl>
            </>
          )}
          <Button colorScheme="pink" onClick={handleNextLevel}>
            {level < 3 ? 'Next' : 'Submit'}
          </Button>
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default HomePage;