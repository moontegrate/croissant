// Style
import './index.scss';

const ToggleSwitch: React.FC<{
    checked: boolean,
    disabled: boolean,
    className: string
}> = ({checked, disabled, className}) => {
    return (
        <div
            className={className + ' toggle-switch' + (checked ? ' toggle-switch__checked' : '') + (disabled ?' toggle-switch__disabled' : '')}
            style={{
                justifyContent: checked ? 'end' : 'start'
            }}
        >
            <div className='toggle-switch__round'></div>
        </div>
    );
};

export default ToggleSwitch;