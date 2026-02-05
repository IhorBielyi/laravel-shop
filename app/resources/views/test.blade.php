<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>
<body>

<!-- Bootstrap 5 required: bootstrap.min.css + bootstrap.bundle.min.js (для dropdown) -->

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container-fluid">


        <!-- Mobile toggler -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar"
                aria-controls="adminNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav content -->
        <div class="collapse navbar-collapse" id="adminNavbar">

            <!-- Left nav -->
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
                <!-- Brands -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle px-lg-3 rounded-3" href="#" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        Бренди
                    </a>
                    <ul class="dropdown-menu shadow border-0">
                        <li>
                            <a class="dropdown-item d-flex align-items-center" href="#">
                                <span class="me-2 text-primary">+</span> Створити бренд
                            </a>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" href="#">Перегляд брендів</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

@yield('content')

<style>
    .navbar .nav-link {
        transition: background-color .15s ease, color .15s ease;
    }
    .navbar .nav-link:hover {
        background-color: rgba(255,255,255,.12);
    }
    .navbar .nav-link.active {
        background-color: rgba(255,255,255,.18);
    }

    .input-group .form-control:focus {
        box-shadow: none;
    }
</style>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>
