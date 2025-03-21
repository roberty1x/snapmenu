import axios from 'axios';
import { supabase, handleSupabaseError } from './supabase';
import { Dish } from '../types';

// Replace with your actual Google Custom Search API key and search engine ID
const GOOGLE_API_KEY = 'AIzaSyCxYUmgr4wnLGP0R7zJKgM9CLOlvtW8rrw';
const SEARCH_ENGINE_ID = 'a3baeeb57ce9d4cfe';

export const searchDishImage = async (dishName: string): Promise<string> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
        dishName + ' food dish'
      )}&searchType=image&num=1`
    );

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].link;
    }

    // Return a fallback image URL if no results found
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop';
  } catch (error) {
    console.error('Error searching for dish image:', error);
    // Return a fallback image URL in case of error
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop';
  }
};

export const saveDish = async (userId: string, dishName: string, imageUrl: string): Promise<Dish> => {
  try {
    const newDish = {
      name: dishName,
      imageUrl,
      userId,
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('dishes').insert(newDish).select('*').single();

    if (error) {
      throw error;
    }

    return data as Dish;
  } catch (error) {
    handleSupabaseError(error as Error);
    throw error;
  }
};

export const getUserDishes = async (userId: string): Promise<Dish[]> => {
  try {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Dish[];
  } catch (error) {
    handleSupabaseError(error as Error);
    throw error;
  }
}; 