import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContex";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";



const Details = () => {

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
    const { id } = useParams();
    const result = useQuery(["details", id], fetchPet);

    if (result.isLoading) {
        return (
            <div className="details">
        <h2 className="loader">🌀</h2>;
        </div>
        );     
    }

    if (result.isError) {
        return <h2>Oh no something went wrong</h2>;
    }
    

    const pet = result.data.pets[0];


    return (
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}
                <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                <p>{pet.description}</p>
                 {
                    showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {pet.name}?</h1>
                                <div className="buttons">
                                    <button onClick={() => {
                                        setAdoptedPet(pet);
                                        navigate("/");
                                    }}
                                    >
                                    Yes
                                    </button>
                                    <button onClick={() => setShowModal(false)}>No</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null
                 }
                </h2>
            </div>
            
        </div>
    );
  };

  function DetailsWithErrorBoundary(props) {
    return (
      <ErrorBoundary>
        <Details {...props} />
      </ErrorBoundary>
    );
  }
  
  export default DetailsWithErrorBoundary;