
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    useQuery,
    gql
} from "@apollo/client";

const GET_PERSON = gql`
  query GetPerson($name: String!) {
    person (name: $name) {
        name,
        height,
        gender,
        mass,
        homeworld,
        age,
        hair_color,
        skin_color,
        birth_year,
        films,
        species,
        vehicles,
        starships,
        created,
        edited,
        url
  }
}`;

const Person = props => {

    const { name } = useParams();
    const { error, loading, data } = useQuery(GET_PERSON, {
        variables: { name: name },
    });

    const [person, setPerson] = useState(null);

    useEffect(() => {
        if (data) {
            setPerson(data.person);
        }
    }, [data]);

    if (person)
        return (
            <div className="container person-details">
                <div className="row h1">
                    <div className="col">
                        <span>{person.name}</span>
                        <Link to="/" className="btn-back">Go back</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered table-sm">
                            <tbody>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <td>
                                    {person.name}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Height
                                </th>
                                <td>
                                    {person.height}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Gender
                                </th>
                                <td>
                                    {person.gender}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Mass
                                </th>
                                <td>
                                    {person.mass}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Homeworld
                                </th>
                                <td>
                                    <a target="_blank" href={person.homeworld}>{person.homeworld}</a>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Age
                                </th>
                                <td>
                                    {person.age}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Hair color
                                </th>
                                <td>
                                    {person.hair_color}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Skin color
                                </th>
                                <td>
                                    {person.skin_color}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Birth year
                                </th>
                                <td>
                                    {person.birth_year}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Films
                                </th>
                                <td>
                                    {person.films.length > 0 && person.films.map(k => <div key={k}><a target="_blank" href={k}>{k}</a><br /></div>) || "NA"}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Species
                                </th>
                                <td>
                                    {person.species.length > 0 && person.species.map(k => <div key={k}><a target="_blank" href={k}>{k}</a><br /></div>) || "NA"}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Vehicles
                                </th>
                                <td>
                                    {person.vehicles.length > 0 && person.vehicles.map(k => <div key={k}><a target="_blank" href={k}>{k}</a><br /></div>) || "NA"}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Starships
                                </th>
                                <td>
                                    {person.starships.length > 0 && person.starships.map(k => <div key={k}><a target="_blank" href={k}>{k}</a><br /></div>) || "NA"}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Created
                                </th>
                                <td>
                                    {person.created}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Edited
                                </th>
                                <td>
                                    {person.edited}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    URL
                                </th>
                                <td>
                                    <a target="_blank" href={person.url}>{person.url}</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div className="container text-center" style={{ marginTop: '20%' }}>Loading...</div>
        );
}

export default Person;
