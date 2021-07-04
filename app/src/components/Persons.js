
import React, { useEffect, useState } from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import PersonBox from './PersonBox';

const GET_PERSONS = gql`
  query GetPersons($page: Int) {
    persons(page: $page) {
        name,
        height,
        gender,
        mass,
        homeworld  
    }
}`;

const Persons = () => {

    const [page, setPage] = useState(1);
    const {error, loading, data} = useQuery(GET_PERSONS, {
        variables: { page: page },
    });
    const [persons, setPersons] = useState(null);

    useEffect(() => {
        if(data) {
            setPersons(data.persons);
        }
    }, [data, page]);

    const handleNext = e => {
        e.preventDefault();
        setPage(page + 1);
    }

    const handlePrevious = e => {
        e.preventDefault();
        if(page > 1)
            setPage(page - 1);
    }

    return (
        <div className="container">
            <div className="row h1" style={{marginTop: '50px'}}>
                <div className="col">
                    <h2>Persons</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {
                        persons && persons.map((person, idx) => <PersonBox key={idx+1} name={person.name} />)
                    }
                </div>
            </div>
            <div className="row text-center" style={{marginTop: '20px', marginBottom: '50px'}}>
                <div className="col">
                    <button className="btn btn-sm btn-primary m-3" onClick={handlePrevious}>Previous Page</button>
                    Current page: {page}
                    <button className="btn btn-sm btn-primary m-3" onClick={handleNext}>Next Page</button>
                </div>
            </div>
        </div>
    );
}

export default Persons;
