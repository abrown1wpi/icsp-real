import { useEffect, useState } from "react";

const PinBox = ({ ID, pinUpdate, supabase }) => {
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        console.log(`PIN UPDATE: ${pinUpdate}`);

        const getName = async () => {
            const { data, error } = await supabase.from("Pins").select("Pin_Name").eq("id", ID).single();
            if (data) {
                setDisplayName(data.Pin_Name || "No Name");
            }
        };
        getName();
    }, [pinUpdate, ID]);

    return (
        <div>
            <h1>{displayName}</h1>
            <p>{ID}</p>
        </div>
    );
};

const PinMenu = ({ pinsIds, supabase, pinUpdate }) => {
    const divStyle = {
        width: '20vw',
        height: '100vh',
        background: '#5b6266',
        position: 'absolute',
        left: '80%',
        zIndex: 3,
        overflow: 'scroll',
    };

    return (
        <div style={divStyle}>
            {pinsIds.map((id) => (
                <PinBox key={id} ID={id} pinUpdate={pinUpdate} supabase={supabase} />
            ))}
        </div>
    );
};

export default PinMenu;
