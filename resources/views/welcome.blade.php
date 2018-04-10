<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" ng-app="tournamentApp">
<head>
    <meta charset="UTF-8">
    <title>Tournament App</title>
    <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="libs/bootstrap-material-design-dist/css/bootstrap-material-design.min.css">
    <link rel="stylesheet" href="css/dashboard.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    
    
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap d-flex justify-content-between p-0">
        <a class="navbar-brand col-sm-2 mr-0 text-center" href="#"><i class="fas fa-users fa-2x"></i></a>
        <form-search class="w-100"></form-search>
        <!-- <ul class="navbar-nav mx-1">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#">Sign out</a>
          </li>
        </ul> -->
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="d-none d-md-block col-md-2 bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active p-2" href="#">
                  <span class="fas fa-home"></span>
                  Results
                </a>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link p-2" href="#">
                  <span class="fas fa-cogs"></span>
                  Settings
                </a>
              </li> -->
            </ul>
          </div>
        </nav>

        <main role="main" class="col-sm-12 col-md-10 pt-3 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Tournament 101 - Final Results</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-sm btn-outline-success" data-toggle="modal" data-target="#addNewPlayer">Add new player</button>
              </div>
            </div>
          </div>

            <div class="table-responsive">
                <players-list></players-list>
            </div>

            <pagination></pagination>

        </main>
      </div>
  </div>
    
    <div ng-show="$rootScope.is_loading">
        <i class="fas fa-sync fa-spin fa-5x" id="spinner"></i>
    </div>

    <!-- Modal addNewPlayer -->
    <form-new-player></form-new-player>

    <script src="libs/jquery/jquery-3.2.1.min.js"></script>
    <script src="libs/popper/popper.min.js"></script>
    <script src="libs/fontawesome-5.0.9/svg-with-js/js/fontawesome-all.min.js"></script>
    <script src="libs/bootstrap-material-design-dist/js/bootstrap-material-design.min.js"></script>
    <script src="libs/angular/angular.min.js"></script>
    <script src="libs/angular/angular-sanitize.min.js"></script>
    <script src="app/app.js"></script>
    <script src="app/services.js"></script>
    <!-- Components -->
    <script src="app/form-search/form-search.component.js"></script>
    <script src="app/players-list/players-list.component.js"></script>
    <script src="app/pagination/pagination.component.js"></script>
    <script src="app/form-new-player/form-new-player.component.js"></script>
</body>
</html>