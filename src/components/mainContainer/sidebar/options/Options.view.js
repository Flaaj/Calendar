import React from "react";
// styles:
import "./_options.scss";

const Options = ({ freeTermsDays, upcomingDays, handleChange, onSubmit }) => {
    return (
        <div className="terms">
            <h2 className="terms__heading">Opcje</h2>
            <div className="terms__content">
                <form action="" onSubmit={onSubmit}>
                    <div className="row">
                        <label>Ile dni pokazywać w "Wolnych terminach":</label>
                        <input type="number" value={freeTermsDays} onChange={handleChange("freeTermsDays")} />
                    </div>
                    <div className="row">
                        <label>Ile dni pokazywać w "Nadchodzących rezerwacjach":</label>
                        <input type="number" value={upcomingDays} onChange={handleChange("upcomingDays")} />
                    </div>
                    <button type="submit">Zapisz</button>
                </form>
            </div>
        </div>
    );
};

export default Options;
