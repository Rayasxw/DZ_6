import { useForm } from "react-hook-form";
import { useState } from "react";

function MainPage() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [user, setUser] = useState([]);
    let userIdCounter = 0;

    const onSubmit = (data) => {
        setUser([...user, { ...data, id: userIdCounter++ }]);
        reset();
    };

    const userDelete = (id) => {
        setUser(user.filter(user => user.id !== id));
    };

    const userClearAll = () => {
        setUser([]);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <input
                        className={errors.name && "error"}
                        type="text"
                        placeholder="Введите имя"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>*Обязательное поле</span>}
                </label>

                <label>
                    <input
                        className={errors.username && "error"}
                        type="text"
                        placeholder="Введите фамилию"
                        {...register("username", { required: true })}
                    />
                    {errors.username && <span>*Обязательное поле</span>}
                </label>

                <label>
                    <input
                        className={errors.email && "error"}
                        type="email"
                        placeholder="Введите email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span>*Обязательное поле</span>}
                </label>

                <label>
                    <input
                        className={errors.phone && "error"}
                        type="tel"
                        placeholder="Введите номер"
                        {...register("phone", { required: true })}
                    />
                    {errors.phone && <span>*Обязательное поле</span>}
                </label>

                <label>
                    <input
                        type="text"
                        placeholder="Введите вебсайт"
                        {...register("website")}
                    />
                </label>

                <button type="submit">Создать</button>
                <button type="button" onClick={userClearAll}>Очистить таблицу</button>
            </form>

            {user.length === 0 ? (
                <p>Список пуст</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Email</th>
                        <th>Номер</th>
                        <th>Вебсайт</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.website}</td>
                            <td>
                                <button onClick={() => userDelete(u.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default MainPage;