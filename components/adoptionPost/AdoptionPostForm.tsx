"use client";
import { useState } from 'react';
import CatProfileFields from "@/components/adoptionPost/CatProfileFields";

export default function AdoptionPostForm(action: any) {
  const [catList, setCatList] = useState([0]);

  const addCat = () => 
    setCatList([...catList, catList.length]);

  return (
    <form action={action} className="max-w-2xl mx-auto p-8 bg-white border border-gray-200 rounded-none shadow-none">
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">Titre</label>
        <input type="text" name="title" id="title" required className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 bg-white text-gray-900" />
      </div>
      <div className="mb-6">
        <label htmlFor="slogan" className="block text-sm font-medium text-gray-900 mb-2">Slogan</label>
        <input type="text" name="slogan" id="slogan" required className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 bg-white text-gray-900" />
      </div>
      <div className="mb-6">
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-900 mb-2">Description courte</label>
        <textarea name="shortDescription" id="shortDescription" className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 bg-white text-gray-900 resize-none" rows={3}></textarea>
      </div>
      <div className="mb-6">
        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-900 mb-2">Description longue</label>
        <textarea name="longDescription" id="longDescription" className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 bg-white text-gray-900 resize-none" rows={5}></textarea>
      </div>
      <div className="mb-6">
        <label htmlFor="photos" className="block text-sm font-medium text-gray-900 mb-2">Photos</label>
        <input type="file" name="photos" id="photos" multiple className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
      </div>
      <div className="mb-6">
        <label htmlFor="isDuo" className="flex items-center text-sm font-medium text-gray-900">
          <input type="checkbox" name="isDuo" id="isDuo" required className="mr-2 h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded-none" />
          Duo
        </label>
      </div>
      <div className="mb-6">
        <label htmlFor="price" className="block text-sm font-medium text-gray-900 mb-2">Prix</label>
        <input type="number" name="price" id="price" required className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 bg-white text-gray-900" />
      </div>
      {catList.map((id, index) => (
        <CatProfileFields key={id} />
      ))}
      <div className="mb-6">
        <button 
          type="button" 
          onClick={addCat}
          className="w-full py-2 px-4 border border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-none font-medium"
        >
          + Ajouter un autre chat
        </button>
      </div>

      <button type="submit" className="w-full py-3 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-200 rounded-none font-bold">
        Publier
      </button>
    </form>
  );
}
