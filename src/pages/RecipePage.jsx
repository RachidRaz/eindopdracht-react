import React from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../utils/data';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import {
  Card,
  CardFooter,
  CardBody,
  Image,
  Badge,
  Text,
  Center,
  Heading,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

export const RecipePage = () => {
  // we read the recipe identifier, we want know which recipe we navigated to
  const { recipeId } = useParams();

  // we filter through all the recipes until we find the recipe that we are navigating to
  // we need to make sure we lookup by identifier
  const recipe = data.hits.filter((recipe, index) => {
    console.log(recipe);
    return recipeId == (index + 1)
  })?.[0];

  // default variables for model events and size
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('md')

  // when the modal is triggered (from chakra ui)
  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  return (
    <Center flexDir="column">
      <Heading pt={10} pb={10}>Recipe Details</Heading>
      <Card maxW='sm'>
        <CardBody>
          <Image
            src={recipe?.recipe.image}
            alt={recipe?.recipe.label}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            {recipe?.recipe?.mealType.map(mealType => (
              <Text>{mealType.toUpperCase()}</Text>
            )) ??
              <Text>No meal type specified</Text>
            }
            <Heading size='md'>{recipe?.recipe.label}</Heading>
            <Text>
              Total Cooking Time: {recipe?.recipe?.totalTime ?? "No cooking time specified"}
            </Text>
            <Text>
              Servings: {recipe?.recipe?.yield ?? "No servings specified"}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardBody>
          <Stack mt='6' spacing='3'>
            <Text>
              <Heading size='sd'>Ingredients:</Heading>
            </Text>
            <Text>
              {recipe?.recipe?.ingredients.map(ingredient => (
                <div>
                  - {ingredient.text}
                </div>
              )) ?? "No ingredients specified"}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              <ChakraLink as={ReactRouterLink} to={`/`}>
                Back
              </ChakraLink>
            </Button>
            <Button variant='ghost' onClick={() => handleSizeClick(size)}
              key="full">
              More Details
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Heading size='md' mb="5" mt="5">Health labels:</Heading>
            <Divider />
            <div>
              {recipe?.recipe?.healthLabels.map(healthLabel => (
                <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                  {healthLabel}
                </Badge>
              )) ??
                <Text>No health labels specified</Text>
              }
            </div>
            <Divider />
            <Heading size='md' mb="5" mt="5">Diet:</Heading>
            {recipe?.recipe?.dietLabels.map(dietLabel => (
              <Badge ml='1' fontSize='0.8em' colorScheme='yellow'>
                {dietLabel}
              </Badge>
            )) ??
              <Text>No diet specified</Text>
            }
            <Divider mt="5" />
            <Heading size='md' mb="5" mt="5">Cautions:</Heading>
            {recipe?.recipe?.cautions.map(dietLabel => (
              <Badge ml='1' fontSize='0.8em' colorScheme='red'>
                {dietLabel}
              </Badge>
            )) ??
              <Text>No diet specified</Text>
            }
            <Divider mt="5" />
            <Heading size='md' mb="5" mt="5">Total Nutrients:</Heading>
            <StatGroup>
              {/* Nutrients doesnt have nummeric keys, so we are looping through all the alphanummeric keys
              and display the values (quantity, unit etc.) */}
              {Object.keys(recipe?.recipe?.totalNutrients).map((totalNutrientKey, index) => {
                const totalNutrient = recipe?.recipe?.totalNutrients[totalNutrientKey];

                return (
                  <Card m="1">
                    <CardBody>
                      <Stat key={index}>
                        <StatLabel>{totalNutrient.label}</StatLabel>
                        <StatNumber fontSize='0.7em'>{totalNutrient?.quantity.toFixed(2)}</StatNumber>
                        <StatHelpText>{totalNutrient.unit}</StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>
                );
              }) ??
                <Text>No nutrient label specified</Text>
              }
            </StatGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};
