import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios
                    .get("http://localhost:4000/mp4Files/list")
                    .then((res) => {
                        console.log(res.data.data);
                        setFiles(res.data.data);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (id) => {
        navigate("/map/" + id);
    };

    return (
        <div class="relative overflow-x-auto p-12">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            MP4 Files (Click to View Map)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Path
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Uploaded At
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Updated At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {files &&
                        files.map((f, idx) => {
                            return (
                                <>
                                    <tr
                                        key={idx}
                                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            class="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            onClick={() => handleClick(f.id)}
                                        >
                                            {f.filename}
                                        </th>
                                        <td class="px-6 py-4">{f.path}</td>
                                        <td class="px-6 py-4">{f.createdAt}</td>
                                        <td class="px-6 py-4">{f.updatedAt}</td>
                                    </tr>
                                </>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
