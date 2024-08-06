import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";



export default function useBreedList(animal) {
    const results = useQuery(["breeds", animal], fetchPet);
    return [results?.data?.breeds ?? [], results.status];
}
