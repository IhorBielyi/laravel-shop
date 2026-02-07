@extends('test')

@section('content')

    <div class="container mt-4">

        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h2 class="m-0 fw-bold">Бренди</h2>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-body p-0">

                <!-- Responsive wrapper -->
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-primary">
                        <tr>
                            <th scope="col" class="text-center" style="width: 90px;">ID</th>
                            <th scope="col">Імʼя</th>
                            <th scope="col">Slug</th>
                            <th scope="col" class="text-center" style="width: 140px;">Дії</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td class="text-center fw-semibold">1</td>
                            <td>Coca-Cola</td>
                            <td><span class="badge text-bg-light border">coca-cola</span></td>
                            <td class="text-center">
                                <div class="btn-group" role="group" aria-label="Actions">
                                    <a href="#" class="btn btn-sm btn-outline-primary" title="Редагувати">
                                        <!-- pencil icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l2.999 3a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 2 3 10.207V13h2.793L14 4.793 11.207 2z"/>
                                        </svg>
                                    </a>

                                    <button type="button" class="btn btn-sm btn-outline-danger" title="Видалити"
                                            data-bs-toggle="modal" data-bs-target="#deleteBrandModal">
                                        <!-- trash icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v7a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0V6zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0V6z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4H4.118zM2.5 3h11V2h-11v1z"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="text-center fw-semibold">2</td>
                            <td>Lagom</td>
                            <td><span class="badge text-bg-light border">lagom</span></td>
                            <td class="text-center">
                                <div class="btn-group" role="group" aria-label="Actions">
                                    <a href="#" class="btn btn-sm btn-outline-primary" title="Редагувати">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l2.999 3a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 2 3 10.207V13h2.793L14 4.793 11.207 2z"/>
                                        </svg>
                                    </a>
                                    <button type="button" class="btn btn-sm btn-outline-danger" title="Видалити"
                                            data-bs-toggle="modal" data-bs-target="#deleteBrandModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v7a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0V6zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0V6z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4H4.118zM2.5 3h11V2h-11v1z"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>

            </div>

            <!-- Footer (optional) -->
            <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                <small class="text-muted">Показано 2 бренди</small>
                <nav aria-label="Pagination">
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">»</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>

    <!-- Delete confirm modal (one modal is enough, you can fill data dynamically in JS/Blade) -->
    <div class="modal fade" id="deleteBrandModal" tabindex="-1" aria-labelledby="deleteBrandModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="deleteBrandModalLabel">Підтвердити видалення</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Ви впевнені, що хочете видалити цей бренд?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Скасувати</button>
                    <button type="button" class="btn btn-danger">Видалити</button>
                </div>
            </div>
        </div>
    </div>

    <style>
        /* аккуратные hover + без лишних теней на фокусе */
        .table-hover tbody tr:hover { cursor: default; }
        .page-link:focus { box-shadow: none; }
        .btn:focus { box-shadow: none; }
    </style>

@endsection
