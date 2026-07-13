import dotenv from 'dotenv';
dotenv.config();

import { db } from '../src/services/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

async function check() {
  console.log("Checking cached documents in Firestore...");
  const querySnapshot = await getDocs(collection(db, "cached_lessons"));
  console.log(`Total cached lessons found: ${querySnapshot.size}`);
  
  const docs = querySnapshot.docs.map(doc => doc.id);
  console.log("Document IDs:", docs);
}

check().catch(console.error);
