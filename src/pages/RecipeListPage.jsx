import React, { useState } from 'react';
import { data } from '../utils/data';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button } from '@chakra-ui/react'
import {
  Center,
  Heading,
  Grid,
  GridItem,
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Input,
  Stack
} from "@chakra-ui/react";


export const RecipeListPage = () => {

  console.log(data.hits[1].recipe.dietLabels);

  // define the searchterm that we use in the search recipe app
  const [searchQuery, setSearchQuery] = useState('');

  // since recipe does not have a unique identifier, we are adding one ourselves
  // to easily identify recipes on the next page
  const recipesWithIds = data.hits.map((recipe, index) => {
    return { ...recipe, id: index + 1 };
  });

  // here we are filtering through all the recipes by the searchterm
  // we want to search by name, health label or diet label
  const filteredRecipes = recipesWithIds.filter(recipe => {
    const nameMatch = recipe?.recipe?.label?.toLowerCase().includes(searchQuery.toLowerCase());

    console.log("name match: ", nameMatch);

    const healthMatch = searchLabels(recipe?.recipe?.healthLabels);

    console.log("health match: ", healthMatch);

    const dietMatch = searchLabels(recipe?.recipe?.dietLabels);

    console.log("diet match: ", dietMatch);

    return (nameMatch || healthMatch || dietMatch);
  });

  // check if any of the labels contain the search query
  // if there are labels an array will be checked for the size and return true when there are any matches
  // else it will result in false
  function searchLabels(labels) {
    return labels?.filter((label) => {
      return label.toLowerCase().includes(searchQuery.toLowerCase());
    }).length > 0
  }

  return (
    <Center flexDir="column">
      <Heading pt={10} pb={10}>Your Recipe App</Heading>
      <Input
        w="60vw"
        maxW="500px"
        placeholder="Search recipes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Grid templateColumns={'repeat(2, 1fr)'} gap={4} pt={20}>
        {/* loop through all the recipes and output the fields needed labels, cautions etc
        we use chakra UI to create a nice UI  */}
        {filteredRecipes.map((recipe, index) => (
          <GridItem key={index}>
            <Box p="5" maxW="320px" borderWidth="1px" align="center" justify="center">
              <Badge colorScheme="gray">{recipe?.recipe?.mealType ?? "no meal type specified"}</Badge>
              <Image w="320px" h="320px" pt={10} rounded="md" objectFit="cover" objectPosition="center" maborderRadius="md" src={recipe?.recipe?.image} />
              <Flex mt={2} flexDir="column" align="center" justify="center">
                <Text
                  ml={2}
                  textTransform="uppercase"
                  fontSize="sm"
                  fontWeight="bold"
                  color="pink.800"
                  pb={6}
                >
                  {recipe?.recipe?.label ?? "no label specified"}
                </Text>
                <Text fontWeight="bold" fontSize='15'>Dish:</Text>
                <div>
                  <a>{recipe?.recipe?.mealType ?? "no dish specified"}</a>
                </div>
                <Text fontWeight="bold" fontSize='15'>Cautions:</Text>
                <div>
                  {recipe?.recipe?.cautions?.length > 0 ?
                    recipe?.recipe?.cautions?.map((caution) => (
                      <Badge colorScheme="red">{caution}</Badge>
                    )) : 'no cautions present'}
                </div>
              </Flex>
              {/* displaying the health and diet labels or default to no labels */}
              <Text fontWeight="bold" fontSize='15' mt="2" mb="2">Health & Diet Labels:</Text>
              <Stack direction='row' wrap="wrap">
                {recipe?.recipe?.healthLabels?.length > 0 ?
                  recipe?.recipe?.healthLabels?.map((label) => (
                    (label.toLowerCase() == "vegan" || label.toLowerCase() == "vegetarian") ? <Badge colorScheme="green">{label}</Badge> : null
                  )) :
                  <Badge colorScheme="green">no health labels specified</Badge>}

                {recipe?.recipe?.dietLabels?.length > 0 ?
                  recipe?.recipe?.dietLabels?.map((label) => (
                    <Badge colorScheme="yellow">{label ?? "no diet labels specified"}</Badge>
                  )) :
                  <Badge colorScheme="yellow">no diet labels specified</Badge>}
              </Stack>

              <Button colorScheme='blue' mt="10" mb="6">
                {/* here we navigate to the recipe page based on the identifier we created */}
                <ChakraLink as={ReactRouterLink} to={`/recipes/${recipe.id}`}>
                  View Recipe Details
                </ChakraLink>
              </Button>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Center>
  );
};


 