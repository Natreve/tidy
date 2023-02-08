import { useEffect, useState } from "react";
import { getFirestore, collection, Timestamp } from "firebase/firestore";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { DateTime } from "luxon";
export type status = "claimed" | "unclaimed" | "completed";
export interface FirebaseJob {
  id: string;
  group: string | null;
  name: string;
  date: Timestamp;
  status: status;
  assigned?: string;
  options?: { [key: string]: any };
}
export interface Job {
  id: string;
  group: string | null;
  name: string;
  date: DateTime;
  status: status;
  assigned?: string;
  options?: { [key: string]: any };
}
export interface Booking {
  [key: string]: {
    id: string;
    name: string;
    date: Date;
  };
}
export const get = async (id: string | string[]) => {
  const firestore = getFirestore();
  const db = collection(firestore, "jobs");
  const jobs: FirebaseJob[] = [];
  try {
    if (typeof id === "string") {
      const snapshot = await getDoc(doc(db, id));
      const data = snapshot.data() as FirebaseJob;
      if (data) jobs.push(data);
      return jobs;
    }
    const q = query(db, where("id", "in", id));
    const snapshots = await getDocs(q);
    if (snapshots.empty) return null;
    snapshots.forEach((snapshot) => {
      jobs.push(snapshot.data() as FirebaseJob);
    });

    return jobs;
  } catch (error) {
    throw Error("Error getting job/jobs", { cause: error });
  }
};
export const useGetUnclaimed = (cb?: (x: [Job[], boolean]) => void) => {
  const [jobs, setJobs] = useState<[Job[], boolean]>([[], false]);
  useEffect(() => {
    const getUnclaimed = async () => {
      const firestore = getFirestore();
      const db = collection(firestore, "jobs");
      const claims: Job[] = [];

      const q = query(db, where("status", "==", "unclaimed"));
      const snapshots = await getDocs(q);
      //still set the state to true to indicate that the jobs even though empty have been loaded
      if (snapshots.empty) {
        if (cb) cb([claims, true]);
        setJobs([claims, true]);
        return;
      }

      snapshots.forEach((snapshot) => {
        let data = snapshot.data() as FirebaseJob;
        let job = data as unknown as Job;
        job.date = DateTime.fromJSDate(data.date.toDate());
        claims.push(job);
      });
      setJobs([claims, true]);
      if (cb) cb([claims, true]);
    };
    getUnclaimed();
  }, []);

  return jobs;
};
