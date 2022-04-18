import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchingError, setFetchingError] = useState();

  useEffect(() => {
    setIsLoading(true);
    setFetchingError(null);
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-order-app-9056c-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseMealsData = await response.json();

      const listOfMeals = [];
      for (const key in responseMealsData) {
        listOfMeals.push({
          id: key,
          name: responseMealsData[key].name,
          description: responseMealsData[key].description,
          price: responseMealsData[key].price,
        });
      }
      setMeals(listOfMeals);
      setIsLoading(false);
    };

    const httpFetchError = async () => {
      try {
        await fetchMeals();
      } catch (error) {
        setIsLoading(false);
        setFetchingError(error.message);
      }
    };
    httpFetchError();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <ul>{mealsList}</ul>;

  if (fetchingError) {
    content = <h3>{fetchingError}</h3>;
  }
  if (isLoading) {
    content = <h3>Loading Meals...</h3>;
  }

  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
