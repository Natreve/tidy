import { useEffect, useState } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { DateTime } from "luxon";
export const get = async (id) => {
    const firestore = getFirestore();
    const db = collection(firestore, "jobs");
    const jobs = [];
    try {
        if (typeof id === "string") {
            const snapshot = await getDoc(doc(db, id));
            const data = snapshot.data();
            if (data)
                jobs.push(data);
            return jobs;
        }
        const q = query(db, where("id", "in", id));
        const snapshots = await getDocs(q);
        if (snapshots.empty)
            return null;
        snapshots.forEach((snapshot) => {
            jobs.push(snapshot.data());
        });
        return jobs;
    }
    catch (error) {
        throw Error("Error getting job/jobs", { cause: error });
    }
};
export const useGetUnclaimed = (cb) => {
    const [jobs, setJobs] = useState([[], false]);
    useEffect(() => {
        const getUnclaimed = async () => {
            const firestore = getFirestore();
            const db = collection(firestore, "jobs");
            const claims = [];
            const q = query(db, where("status", "==", "unclaimed"));
            const snapshots = await getDocs(q);
            //still set the state to true to indicate that the jobs even though empty have been loaded
            if (snapshots.empty) {
                if (cb)
                    cb([claims, true]);
                setJobs([claims, true]);
                return;
            }
            snapshots.forEach((snapshot) => {
                let data = snapshot.data();
                let job = data;
                job.date = DateTime.fromJSDate(data.date.toDate());
                claims.push(job);
            });
            setJobs([claims, true]);
            if (cb)
                cb([claims, true]);
        };
        getUnclaimed();
    }, []);
    return jobs;
};
