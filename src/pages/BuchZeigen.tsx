import { Box, Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {useEffect, useState} from "react";

const ButtonClick = () => {
  interface Book {
    isbn: string;
    rating: number;
    art: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    homepage: string;
    schlagwoerter: string[];
    titel: {
      titel: string;
      untertitel: string;
    };
    _links: {
      self: {
        href: string;
      };
    };
  }
  interface Embedded {
    buecher: Book[];
  }

  interface FetchedData {
    _embedded: Embedded;
  }

  const [fetchedData, setFetchedData] = useState<FetchedData>({ _embedded: { buecher: [] } });

  async function getFetchedData(){
    const response = await fetch("https://localhost:3000/rest");
    const fetchedData = await response.json();
    setFetchedData(fetchedData);
  }
  
  /* const fetchData = () => {
    fetch("https://localhost:3000/rest/", {mode: "no-cors"})
      .then((response) => response.json())
      .then((data) => { 
        console.log(data);
        setFetchedData(data);
      })
  } */

  /* const fetchData = () => {
    fetch("https://localhost:3000/rest"/* , {mode: "no-cors"} )*/
      /* .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFetchedData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } */
    
    return (
      <div>
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="4">
          {<Button onClick={getFetchedData}>
            Bücher Zeigen
          </Button>}
            </Box>
            <TableContainer>
              <Table variant='striped' colorScheme='gray'>
                <TableCaption>Alle Bücher</TableCaption>
                  <Thead>
                    <Tr>
                    <Th>Titel</Th>
                    <Th>ISBN</Th>
                    <Th>Rating</Th>
                    <Th>Art</Th>
                    <Th>Preis</Th>
                    <Th>Rabatt</Th>
                    <Th>Lieferbar</Th>
                    <Th>Datum</Th>
                    <Th>Homepage</Th>
                    <Th>Schlagwörter</Th>
                    <Th>Link</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {fetchedData._embedded.buecher.map((buch, index) => (
                      <Tr key={index}>
                        <Td>{buch.titel.titel}</Td>
                        <Td>{buch.isbn}</Td>
                        <Td>{buch.rating}/10</Td>
                        <Td>{buch.art}</Td>
                        <Td>{buch.preis}€</Td>
                        <Td>{(buch.rabatt * 100).toFixed(2)}%</Td>
                        <Td>{buch.lieferbar ? 'Ja' : 'Nein'}</Td>
                        <Td>{buch.datum}</Td>
                        <Td><a href={buch.homepage} target="_blank" rel="noopener noreferrer">{buch.homepage}</a></Td>
                        <Td>{buch.schlagwoerter.join(', ')}</Td>
                        <Td><a href={buch._links.self.href} target="_blank" rel="noopener noreferrer">{buch._links.self.href}</a></Td>
                    </Tr>
                    ))}    
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            );
          }

  export default ButtonClick
