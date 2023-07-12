import cars from '@/data/cars.json';
import makes from '@/data/makes.json';
import listings from '@/data/listings.json';
import cities from '@/data/cities.json';

export const useCars = () => {
  const toZh = (city) => cities.find(item => item.value === city).name

  return { toZh, cars, makes, listings, cities };
}