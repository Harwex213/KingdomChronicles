const UserProfileFlag = ({ className, flag }) => {
    return (
        <div
            className={className}
            style={{ width: "100%", height: "100%", backgroundColor: flag.backgroundColor }}
        ></div>
    );
};

export { UserProfileFlag };
