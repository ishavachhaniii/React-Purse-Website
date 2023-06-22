import { useEffect, useState } from 'react';
import { db } from './db';
import { collection, onSnapshot } from 'firebase/firestore';

const UseGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, collectionName);

  const getData = async () => {
    let queryRef = collectionRef;

    await onSnapshot(queryRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
};

export default UseGetData;

// import { useEffect, useState } from 'react';
// import { db } from './db';
// import { collection, query, orderBy, limit, startAfter, endBefore, getDocs, doc, updateDoc } from 'firebase/firestore';

// const UseGetData = (collectionName, currentPage, recordsPerPage) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalCount, setTotalCount] = useState(0);

//   const fetchData = async () => {
//     const collectionRef = collection(db, collectionName);
//     const q = query(
//       collectionRef,
//       orderBy('name', 'asc')
//     );

//     const startAfterDocIndex = (currentPage - 1) * recordsPerPage;

//     let limitedQuery = query(q, startAfterDocIndex, limit(recordsPerPage));

//     try {
//       const querySnapshot = await getDocs(limitedQuery);
//       const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

//       setData(newData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [collectionName, currentPage, recordsPerPage]);

//   const fetchTotalCount = async () => {
//     const collectionRef =  collection(db, collectionName);
//     const querySnapshot = await getDocs(collectionRef);
//     setTotalCount(querySnapshot.size);
//   };

//   useEffect(() => {
//     fetchTotalCount();
//   }, [collectionName]);

//   return { data, loading, totalCount };
// };

// export default UseGetData;
