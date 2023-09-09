import { useState } from 'react';

export const Toggle = ({ label, toggled, onClick }) => {
    const [isToggled, toggle] = useState(toggled);

    const callback = () => {
        toggle(!isToggled);
        onClick(!isToggled);
    };

    return (
        <label className="mt-auto mb-auto">
            <input
                className="dh"
                type="checkbox"
                defaultChecked={isToggled}
                onClick={callback}
            />
            <span className="df" />
        </label>
    );
};
