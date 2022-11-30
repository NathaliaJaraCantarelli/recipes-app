import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import { renderWithRouter } from './helpers/renderWith';
import riceMock from './helpers/mockRice';

const searchTopBtn = 'search-top-btn';
const searchInputConst = 'search-input';
const exercSearchBtn = 'exec-search-btn';

describe('Testes do Meats', () => {
  test('Se os elementos estão na página', () => {
    renderWithRouter(<Meals />);
    const meals = screen.getByText(/Meals/i);
    const btnUser = screen.getByTestId('profile-top-btn');
    const btnSearch = screen.getByTestId(searchTopBtn);

    expect(meals).toBeInTheDocument();
    expect(btnUser).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });
  test('Se o fetch é chamado com o ingrediente', async () => {
    renderWithRouter(<Meals />);

    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    const ingredient = screen.getByText(/Ingredient/i);
    expect(ingredient).toBeInTheDocument();
    // const name = screen.getByText(/Name/i);
    // expect(name).toBeInTheDocument();
    // const firstLetter = screen.getByText(/First Letter/i);
    // expect(firstLetter).toBeInTheDocument();
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve({ riceMock }),
        ok: true,
      }));
    userEvent.type(searchInput, 'rice');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    radioIngredient.checked = true;
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=rice');
    // screen.logTestingPlaygroundURL();
  });
  test('Se o fetch é chamado com o nome', async () => {
    renderWithRouter(<Meals />);
    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    const ingredient = screen.getByText(/Name/i);
    expect(ingredient).toBeInTheDocument();
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve({ riceMock }),
        ok: true,
      }));
    userEvent.type(searchInput, 'rice');
    const radioIngredient = screen.getByTestId('name-search-radio');
    radioIngredient.checked = true;
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=rice');
  });
  test('Se o fetch é chamado com a primeira letra', async () => {
    renderWithRouter(<Meals />);
    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    const ingredient = screen.getByText(/Name/i);
    expect(ingredient).toBeInTheDocument();
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve({ riceMock }),
        ok: true,
      }));
    userEvent.type(searchInput, 'r');
    const radioIngredient = screen.getByTestId('first-letter-search-radio');
    radioIngredient.checked = true;
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    expect(global.fetch).toHaveBeenCalled();
  });
  test('Se o fetch é chamado com a primeira letra com mais de uma letra', async () => {
    renderWithRouter(<Meals />);
    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    const ingredient = screen.getByText(/Name/i);
    expect(ingredient).toBeInTheDocument();
    jest.spyOn(global, 'alert');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve({ riceMock }),
        ok: true,
      }));
    userEvent.type(searchInput, 'rice');
    const radioIngredient = screen.getByTestId('first-letter-search-radio');
    radioIngredient.checked = true;
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    expect(global.alert).toHaveBeenCalled();
  });
});
