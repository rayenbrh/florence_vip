# Pousse la branche main vers origin, UN commit a la fois (plusieurs petits transferts reseau).
# Ignore les commits deja presents sur origin/main (apres git fetch) pour eviter les rejets non-fast-forward.
# Usage: .\scripts\push-each-commit.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

if (-not (git remote get-url origin 2>$null)) { throw "Remote origin introuvable." }

Write-Host "git fetch origin..."
git fetch origin
if ($LASTEXITCODE -ne 0) { throw "git fetch a echoue" }

$hasRemoteMain = $true
git rev-parse origin/main 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) { $hasRemoteMain = $false }

$commits = @(git rev-list --reverse main)
$total = $commits.Count
$n = 0
foreach ($c in $commits) {
  $n++
  $msg = (git log -1 --format=%s $c)
  Write-Host ""
  Write-Host ('[{0}/{1}] {2} - {3}' -f $n, $total, $c, $msg)

  if ($hasRemoteMain) {
    git merge-base --is-ancestor $c origin/main 2>$null
    if ($LASTEXITCODE -eq 0) {
      Write-Host "Deja sur origin/main, on saute." -ForegroundColor DarkGray
      continue
    }
  }

  git push origin "${c}:refs/heads/main"
  if ($LASTEXITCODE -ne 0) {
    Write-Host ('Echec au commit {0}/{1}. Corrigez le probleme puis relancez le script.' -f $n, $total) -ForegroundColor Red
    exit $LASTEXITCODE
  }
}
Write-Host ""
Write-Host 'Tous les commits sont sur origin/main.' -ForegroundColor Green
