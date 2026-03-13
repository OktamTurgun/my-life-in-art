import { useEffect, useState } from 'react';

export type Person = {
  id: string;
  name: string;
  profession: string;
  image: string;
  title: string;
  text: string;
  videoId: string;
};

const peopleData: Person[] = require('../data/people.json');

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setPeople(peopleData);
    setLoading(false);
  }, []);

  return { people, loading };
}

export function usePerson(id: string) {
  const { people, loading } = usePeople();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (!loading) {
      const found = people.find((p: Person) => p.id === id);
      setPerson(found || null);
    }
  }, [id, people, loading]);

  return { person, loading };
}