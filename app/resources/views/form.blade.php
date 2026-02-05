@extends('test')

@section('content')

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">

            <div class="card shadow-sm border-0">
                <div class="card-header bg-primary text-white fw-semibold">
                    Створити бренд
                </div>

                <div class="card-body p-4">
                    <form method="POST" action="#">

                        <!-- Name -->
                        <div class="mb-3">
                            <label for="name" class="form-label fw-medium">
                                Назва бренду
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                class="form-control form-control-lg"
                                required
                            >
                        </div>

                        <div class="d-flex justify-content-end gap-2 mt-4">
                            <button type="reset" class="btn btn-outline-secondary">
                                Очистити
                            </button>
                            <button type="submit" class="btn btn-primary px-4">
                                Зберегти
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
</div>

@endsection
