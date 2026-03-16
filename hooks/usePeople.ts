import { useEffect, useState } from 'react';

export type Person = {
  id: string;
  name: string;
  profession: string;
  image: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  text_uz: string;
  text_en: string;
  text_ru: string;
  videoId: string;
};

const peopleData: Person[] = require('../data/people.json');

const normalizedPeople: Person[] = peopleData.map((p: any) => ({
  ...p,
  title_uz: p.title_uz || p.title || '',
  title_en: p.title_en || p.title || '',
  title_ru: p.title_ru || p.title || '',
  text_uz: p.text_uz || p.text || '',
  text_en: p.text_en || p.text || '',
  text_ru: p.text_ru || p.text || '',
}));

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setPeople(normalizedPeople);
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