type Props = {
    icon: JSX.Element;
    label: String;
};

const SidebarButton = ({ icon, label }: Props) => {
    return (
        <button className="flex items-center space-x-2 hover:text-white transition duration-200 ease-out">
            {icon}
            <p>{label}</p>
        </button>
    );
};

export default SidebarButton;
